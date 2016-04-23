var db = require('../models/db');
var errorHandler = require('../lib/errorHandler').handler;
var tokenAnalyzer = require('../lib/TokenAnalyzer');
var Item = require('../models/Item');
var List = require('../models/List');
var Category = require('../models/Category');

var items = {
  getItems: function(req,res) {
    // Filters List, Category,
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    var query = "SELECT ITEMS.IDITEM, ITEMS.ITEMNAME, STOCKS.QUANTITY, LISTS.IDLIST, \
                  LISTS.LISTNAME, CATEGORIES.IDCATEGORY, CATEGORIES.CATEGORYNAME \
                  FROM ITEMS \
                  LEFT JOIN CATEGORIES ON ITEMS.IDCATEGORY = CATEGORIES.IDCATEGORY AND CATEGORIES.IDUSER = "+user_id+"\
                  LEFT JOIN LISTITEMS ON LISTITEMS.IDITEM = ITEMS.IDITEM \
                  LEFT JOIN LISTS ON LISTITEMS.IDLIST = LISTS.IDLIST \
                  LEFT JOIN STOCKS ON STOCKS.IDITEM = ITEMS.IDITEM \
                  WHERE ITEMS.IDUSER = "+user_id;
    if (req.query.category){
      query=query+" AND ITEMS.IDCATEGORY = '"+req.query.category+"'";
    }

    if (req.query.list)
    {
      query = query + " AND LISTS.IDLIST = '"+req.query.list+"'";
    }

    if (req.query.max_result){
      query = query+" LIMIT "+req.query.max_result;
    }

    // Query for result, store in items

    db.query(query, function(err,items){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // Transform to json objects (see Models);
        for (i=0;i<items.length;i++){
          var category = {};
          if (items[i].idcategory)
            var category = new Category(items[i].idcategory,items[i].categoryname);
            var list = new List(items[i].idlist, items[i].listname);
          items[i] = new Item(items[i].iditem,items[i].itemname,category,items[i].quantity,list);




        }
        res.status(200).send({
          "status": 200,
          "message": "Retrieved items successfully",
          "items": items
        });
      }
    });
  },

  addItem: function(req,res) {
    // Parse args
    var itemName = req.body.itemName;
    if (itemName == undefined){
      var err = new Error("Bad query");
      err.http_code = 400;
      errorHandler(err,res);
      return;
    }
    var idCategory = (req.body.idCategory || req.body.idcategory);
    // Get token wherever it's located (in req.body or in req.query (URI) or in authorization headers where it's meant to be
    var token = tokenAnalyzer.grabToken(req);
    var user_id = tokenAnalyzer.getUserId(token);
    if (idCategory)
      var query = "INSERT INTO ITEMS (itemName,idCategory,idUser) \
                    VALUES ('"+itemName+"','"+idCategory+"','"+user_id+"') \
                    RETURNING iditem, itemName,idCategory, \
                    (SELECT CategoryName FROM CATEGORIES WHERE idCategory='"+idCategory+"')"
    else
      var query = "INSERT INTO ITEMS (itemName,idUser) \
                    VALUES ('"+itemName+"','"+user_id+"') \
                    RETURNING iditem, itemName"

    // Query to add an item
    db.query(query, function(err,item){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
          // Send a 201 (created)
          var category = new Category(item[0].idcategory, item[0].categoryname);
          var item = new Item(item[0].iditem, item[0].itemname, category);

          res.status(201).send({
            "status": 201,
            "message": "Item added",
            "item": item
          });
      }
    });

  },

  getItem: function(req,res) {
    // ADD FILTERS HERE
    var idItem = req.params.id
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    query = "SELECT ITEMS.IDITEM,ITEMS.IDCATEGORY,CATEGORYNAME,ITEMNAME,QUANTITY \
             FROM (ITEMS LEFT JOIN STOCKS ON STOCKS.IDITEM = ITEMS.IDITEM) \
                  LEFT JOIN CATEGORIES ON ITEMS.IDCATEGORY = CATEGORIES.IDCATEGORY \
             WHERE ITEMS.IDUSER = "+user_id+" AND ITEMS.IDITEM = '"+idItem+"'";
    // Query for result, store in item
    db.query(query, function(err,item){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{

          if (item[0]){
            // Send a 200 (created)
            var category = new Category(item[0].idcategory, item[0].categoryname);
            var itemObj = new Item(item[0].iditem, item[0].itemname, category, item[0].quantity);

            res.status(200).send({
              "status": 200,
              "message": "Item successfully retrieved",
              "item": itemObj
            });
          }else{
            var err = new Error("Item not found !");
            err.http_code = 404;
            errorHandler(err,res);
          }



      }
    });
  },

  modifyItem: function(req,res) {
    // Parse request
    var id = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    if (req.body.itemName){
      var query = "UPDATE ITEMS SET itemName = '"+req.body.itemName+"' WHERE idUser = '"+user_id+"'\
      RETURNING idItem, itemName, (SELECT quantity FROM STOCKS WHERE idItem = '"+id+"')";
    }
    if (req.body.idCategory){
      // Check if category is owned by token's owner
    }
    if (req.body.itemName){
      // Query to add an item
      db.query(query, function(err,item){
        if (err)
          errorHandler(err, res);
        else{
          if (item[0] == null){
            var err = new Error("Item not found !");
            err.http_code = 404;
            errorHandler(err,res);
          }else{
          var item = new Item(item[0].iditem,item[0].itemname,item[0].idCategory,item[0].quantity);

          // Finally return result
          res.status(200).send({
            "status": 200,
            "message": "Item successfully modified",
            "item": item
          });
        }
      }
    });
  }else{
    var err = new Error("Bad query ! (Missing 'itemName')");
    err.http_code = 400;
    errorHandler(err,res);
  }

  },

  modifyStock: function(req, res){
    var id = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    // Query
    if (req.body.quantity == undefined){
      var err = new Error("Bad query ! (Missing quantity)");
      err.http_code = 400;
      errorHandler(err,res);
      return;
    }
    // Check is user owns this stock
    var query = "UPDATE STOCKS SET QUANTITY = '"+req.body.quantity+"' \
    WHERE idItem = '"+id+"' \
    RETURNING iditem, quantity,(SELECT itemName FROM ITEMS WHERE idItem = '"+id+"' AND idUser = '"+user_id+"')";
    db.query(query, function(err,item){
      if (err)
        errorHandler(err, res);
      else{
        console.log(item);
        if (item[0]){
          var item = new Item(item[0].iditem, item[0].itemname, undefined, item[0].quantity);
          res.status(200).send({
            "status": 200,
            "message": "Stock successfully modified",
            "item": item
          });
        }else{
          var err = new Error("Item not found !");
          err.http_code = 404;
          errorHandler(err,res);
        }
      }
    });
  },

  deleteItem: function(req,res){
    // Parse request
    var id = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    // Query here
    var query = "DELETE FROM ITEMS WHERE IDITEM = '"+id+"' AND IDUSER = '"+user_id+"' RETURNING IDITEM, ITEMNAME";
    db.query(query, function(err,item){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // The item got deleted
        if (item[0])
        {
          var item = new Item(item[0].iditem, item[0].itemname);
          // Send result 200
          res.status(200).send({
            "status": 200,
            "message": "Item successfully deleted",
            "oldItem": item
          });
        }else{ // The item didn't exist
          var err = new Error("Item not found !");
          err.http_code = 404;
          errorHandler(err,res);
        }

      }
    });

  }





};


module.exports = items;
