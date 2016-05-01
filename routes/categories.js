var db = require('../models/db');
var errorHandler = require('../lib/errorHandler').handler;
var tokenAnalyzer = require('../lib/TokenAnalyzer');

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
    var category = (undefined, categoryName, user_id);
    category.insert(function(err, result){
        if (err)
            errorHandler(err,res)
        else
            res.status(200).send(result);
    });

  },


  modifyCategory: function(req,res) {
    // Parse request
    var id = req.params.id;
    var newCategoryName = req.body.categoryName;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    // Query here
    var category = new Category(id,newCategoryName,user_id);
    category.update(function(err,result){
        if (err)
            errorHandler(err,res);
        else
            res.status(200).send(result);
    });
  },

  deleteCategory: function(req,res){
    // Parse request
    var id = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    // Query here
    var category = new Category(id,undefined,user_id);
    category.delete(function(err,result){
        if (err)
            errorHandler(err);
        else
            res.status(200).send(result);
    });
  }





};


module.exports = categories;
