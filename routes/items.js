var db = require('../models/db');
var errorHandler = require('../lib/errorHandler').handler;
var tokenAnalyzer = require('../lib/TokenAnalyzer');
var Item = require('../models/Item');
var Category = require('../models/Category');

var items = {
  getItems: function(req,res) {
    // Filters List, Category,
    var user_id = tokenAnalyzer.getUserId(grabToken(req));
    var query = "SELECT * \
                  FROM ITEMS LEFT JOIN CATEGORIES ON ITEMS.IDCATEGORY = CATEGORIES.IDCATEGORY \
                  WHERE ITEMS.IDUSER = "+user_id;
    if (req.query.category){
      query="SELECT * FROM ITEMS, CATEGORIES \
            WHERE ITEMS.IDUSER = "+user_id+" AND ITEMS.IDCATEGORY = CATEGORIES.IDCATEGORY \
                  AND ITEMS.IDCATEGORY = '"+req.query.category+"'";
    }
    console.log(query);

    if (req.query.list)
    {
      query = "SELECT * FROM ITEMS, LISTITEMS, CATEGORIES \
              WHERE ITEMS.IDITEM = LISTITEMS.IDITEM AND LISTITEMS.IDLISTE = '"+req.query.list+"'";
      if (res.query.category){
        query = query + " AND IDCATEGORY = '"+req.query.category+"'";
      }
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
          items[i] = new Item(items[i].iditem,items[i].itemname,category);




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
    var idCategory = (req.body.idCategory || req.body.idcategory);
    // Get token wherever it's located (in req.body or in req.query (URI) or in authorization headers where it's meant to be
    var token = grabToken(req);
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
            "item": item,
            "links": [ {
                "rel": "self",
                "href": "/api/v1/item/"+item.iditem
            } ]
          });
      }
    });

  },

  getItem: function(req,res) {
    // ADD FILTERS HERE
    var idItem = req.params.id
    var user_id = tokenAnalyzer.getUserId(grabToken(req));
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

    // Query here

    // Send result 200
    res.status(200).send({
      "status": 200,
      "message": "Item modified successfully"
      // Show item modified
    });
  },

  deleteItem: function(req,res){
    // Parse request
    var id = req.params.id;
    var user_id = tokenAnalyzer.getUserId(grabToken(req));
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

var grabToken = function(req){
  return (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
};

module.exports = items;
