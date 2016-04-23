var db = require('../models/db');
var errorHandler = require('../lib/errorHandler').handler;
var tokenAnalyzer = require('../lib/TokenAnalyzer');
var Item = require('../models/Item');
var Category = require('../models/Category');

var categories = {
  getCategories: function(req,res) {
    // ADD FILTERS HERE
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    var query = "SELECT * FROM CATEGORIES WHERE IDUSER = '"+user_id+"'";
    // Query for result, store in categories
    db.query(query, function(err,categories){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // Transform to json objects (see Models);
        for (i=0;i<categories.length;i++){
          categories[i] = new Category(categories[i].idcategory,categories[i].categoryname);
        }
        res.status(200).send({
          "status": 200,
          "message": "Retrieved categories successfully",
          "categories": categories
        });
      }
    });

  },

  addCategory: function(req,res) {
    // ADD FILTERS HERE
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    var categoryName = req.body.categoryName;
    if (req.body.categoryName == undefined){
      var err = new Error("Bad query ! (missing 'categoryName')");
      err.http_code = 400;
      errorHandler(err,res);
    }
    var query = "INSERT INTO CATEGORIES (categoryName, idUser) VALUES ('"+categoryName+"','"+user_id+"') RETURNING idCategory, categoryName";
    // Query for result, store in categories
    db.query(query, function(err,category){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // Transform to json objects (see Models);
        category = new Category(category[0].idcategory,category[0].categoryname);
        res.status(201).send({
          "status": 201,
          "message": "Category successfully added",
          "category": category
        });
      }
    });

  },


  modifyCategory: function(req,res) {
    // Parse request
    var id = req.params.id;
    var newCategoryName = req.body.categoryName;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    // Query here
    var query = "UPDATE CATEGORIES SET categoryName = '"+newCategoryName+"' WHERE idCategory = '"+id+"'\
    AND idUser = '"+user_id+"' RETURNING idCategory, categoryName";
    db.query(query, function(err,category){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        if (category[0]){
          // Transform to json objects (see Models);
          category = new Category(category[0].idcategory,category[0].categoryname);
          res.status(201).send({
            "status": 201,
            "message": "Category successfully modified",
            "category": category
          });
        }else{
          var err = new Error("Category not found !");
          err.http_code = 404;
          errorHandler(err,res);
        }

      }
    });
  },

  deleteCategory: function(req,res){
    // Parse request
    var id = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    // Query here
    var query = "DELETE FROM CATEGORIES WHERE IDCATEGORY = '"+id+"' AND IDUSER = '"+user_id+"' RETURNING idCategory, categoryName";
    db.query(query, function(err,item){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // The category got deleted
        if (category[0])
        {
          var category = new Category(category[0].idcategory, category[0].categoryname);
          // Send result 200
          res.status(200).send({
            "status": 200,
            "message": "Category successfully deleted",
            "oldCategory": category
          });
        }else{ // The category didn't exist (or is not owned by the user)
          var err = new Error("Category not found !");
          err.http_code = 404;
          errorHandler(err,res);
        }

      }
    });
  }





};


module.exports = categories;
