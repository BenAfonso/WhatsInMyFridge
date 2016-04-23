var db = require('../models/db');
var errorHandler = require('../lib/errorHandler').handler;
var tokenAnalyzer = require('../lib/TokenAnalyzer');
var List = require('../models/List');
var Item = require('../models/Item');

var lists = {
  getLists: function(req,res) {
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    var query = "SELECT * FROM LISTS WHERE LISTS.IDUSER = "+user_id;
    // Query for result, store in recipes
    db.query(query, function(err,lists){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // Transform to json objects (see Models);
        for (i=0;i<lists.length;i++){
          lists[i] = new List(lists[i].idlist,lists[i].listname);
        }
        res.status(200).send({
          "status": 200,
          "message": "Retrieved lists successfully",
          "lists": lists
        });
      }
    });
  },

  getList: function(req, res){
    var listId = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    query = "SELECT * \
             FROM LISTS RIGHT JOIN LISTITEMS ON LISTS.IDLIST = LISTITEMS.IDLIST \
             LEFT JOIN ITEMS ON LISTITEMS.IDITEM = ITEMS.IDITEM \
             WHERE LISTS.IDLIST = '"+listId+"' AND LISTS.IDUSER = "+user_id;
    // Query for result, store in item
    db.query(query, function(err,list){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{

          if (list[0]){
            // Send a 200 (created)
            //var category = new Category(list[0].idcategory, list[0].categoryname);
            var listObj = new List(list[0].idlist, list[0].listname);
            for (i = 0;i<list.length;i++){
              list[i] = new Item(list[i].iditem,list[i].itemname);
            }
            res.status(200).send({
              "status": 200,
              "message": "List successfully retrieved",
              "list": listObj,
              "items": list
            });
          }else{
            var err = new Error("List not found !");
            err.http_code = 404;
            errorHandler(err,res);
          }
      }
    });
  },

  addList: function(req,res) {
    // Parse args
    var listName = req.body.listName;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));

    if (listName == undefined){
      var err = new Error("Bad query (Missing 'listName' in body)");
      err.http_code = 400;
      errorHandler(err,res);
      return;
    }
    // Query to add list
    var query = "INSERT INTO LISTS (listName,idUser) VALUES ('"+listName+"','"+user_id+"') RETURNING idList,listName";
    db.query(query, function(err,list){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // Transform to json objects (see Models);
        list = new List(list[0].idlist,list[0].listname);
        // Send result 201 (created)
        res.status(201).send({
          "status": 201,
          "message": "List successfully added",
          "list": list
        });
      }
    });
  },

  modifyList: function(req, res) {
    // Parse args
    var listid = req.params.id;
    var newName = req.body.listName;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    if (newName){
      var query = "UPDATE LISTS SET listName = '"+newName+"' \
      WHERE idList = '"+listid+"' AND idUser = '"+user_id+"' RETURNING idList, listName";
      db.query(query, function(err,list){
        console.log(err);
        if (err)
          errorHandler(err, res);
        else{
          // The item got deleted
          if (list[0])
          {
            var list = new List(list[0].idlist, list[0].listname);
            // Send result 200
            res.status(200).send({
              "status": 200,
              "message": "List successfully modfied",
              "oldList": list
            });
          }else{ // The item didn't exist or wasn't the token owner's
            var err = new Error("List not found !");
            err.http_code = 404;
            errorHandler(err,res);
          }

        }
      });

    }else{
      var err = new Error("Bad query ! (Missing 'listName')");
      err.http_code = 400;
      errorHandler(err,res);
    }

  },

  deleteList: function(req, res){
    // Parse request
    var listId = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));

    // Query to delete list

    var query = "DELETE FROM LISTS WHERE IDLIST = '"+listId+"' AND IDUSER = '"+user_id+"' RETURNING IDLIST, LISTNAME";
    db.query(query, function(err,list){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // The item got deleted
        if (list[0])
        {
          var list = new List(list[0].idlist, list[0].listname);
          // Send result 200
          res.status(200).send({
            "status": 200,
            "message": "List successfully deleted",
            "oldList": list
          });
        }else{ // The item didn't exist or wasn't the token owner's
          var err = new Error("List not found !");
          err.http_code = 404;
          errorHandler(err,res);
        }

      }
    });

  },

  addItem: function(req,res){
    // Parse request
    var listId = req.params.id;
    // Query to add given item in recipe
    var token = tokenAnalyzer.grabToken(req);
    var idItem = req.body.idItem;

    if (idItem == undefined){
      var err = new Error("Bad query");
      err.http_code = 400;
      errorHandler(err,res);
      return;
    }
    var user_id = tokenAnalyzer.getUserId(token);
    isOwnerOf(user_id,listId,idItem,function(err,isOwner){
      if (err){
        errorHandler(err,res);
      }else{

      var query = "INSERT INTO LISTITEMS (idList,idItem) \
                    VALUES ('"+listId+"','"+idItem+"') \
                    RETURNING idList, (SELECT listName FROM LISTS WHERE idUser = '"+user_id+"' AND idList = '"+listId+"')";


    // Query to add an item
    db.query(query, function(err,list){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
          // Send a 201 (created)
          var list = new List(list[0].idlist, list[0].listname);

          res.status(201).send({
            "status": 201,
            "message": "Item added to list",
            "list": list
          });
      }
    });
  }
});


  },

  deleteItem: function(req,res){
    // Parse request
    var listId = req.params.list_id;
    // Query to add given item in recipe
    var token = tokenAnalyzer.grabToken(req);
    var idItem = req.params.item_id;

    if (idItem == undefined){
      var err = new Error("Bad query");
      err.http_code = 400;
      errorHandler(err,res);
    }
    var user_id = tokenAnalyzer.getUserId(token);
    isOwnerOf(user_id,listId,idItem,function(err,isOwner){
      if (err){
        errorHandler(err,res);
      }else{

      var query = "DELETE FROM LISTITEMS WHERE idItem = '"+idItem+"' AND idList = '"+listId+"'\
                    RETURNING idList, (SELECT listName FROM LISTS WHERE idUser = '"+user_id+"' AND idList = '"+listId+"')";


    // Query to add an item
    db.query(query, function(err,list){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
          // Send a 201 (created)
          var list = new List(list[0].idlist, list[0].listname);

          res.status(201).send({
            "status": 201,
            "message": "Item deleted from list",
            "list": list
          });
      }
    });
    }
  });
}
};

function isOwnerOf(idUser, idList, idItem, fn) {
  db.query("SELECT * FROM LISTS WHERE idUser = '"+idUser+"' AND idList = '"+idList+"'", function(err,list){
    console.log(err);
    if (err)
      fn(err,false);
    else{
      if (list[0]){
        db.query("SELECT * FROM ITEMS WHERE idUser = '"+idUser+"' AND idItem = '"+idItem+"'", function(err,item){
          console.log(err);
          if (err)
            fn(err,false);
          else{
              // Send a 201 (created)
              if (item[0])
                return fn(null,true);
              else {
                var err = new Error("Item not found");
                err.http_code = 404;
                return fn(err,false);
              }

            }
        });
      }else{
        var err = new Error("List not found !");
        err.http_code = 404;
        return fn(err,false);
      }

    }
  });
}

module.exports = lists;
