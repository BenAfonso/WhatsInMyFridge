var db = require('../models/db');
var errorHandler = require('../lib/errorHandler').handler;
var tokenAnalyzer = require('../lib/TokenAnalyzer');
var Recipe = require('../models/Recipe');
var Item = require('../models/Item');


var recipes = {
  getRecipes: function(req,res) {
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    var query = "SELECT * FROM RECIPES WHERE RECIPES.IDUSER = "+user_id;
    // Query for result, store in recipes
    db.query(query, function(err,recipes){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // Transform to json objects (see Models);
        for (i=0;i<recipes.length;i++){
          recipes[i] = new Recipe(recipes[i].idrecipe,recipes[i].recipename);
        }
        res.status(200).send({
          "status": 200,
          "message": "Retrieved recipes successfully",
          "recipes": recipes
        });
      }
    });
  },

  addRecipe: function(req,res) {
    // Parse args
    var recipeName = req.body.recipeName;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));

    if (recipeName){
    // Query to add a recipe
      var query = "INSERT INTO RECIPES (recipeName,idUser) VALUES ('"+recipeName+"','"+user_id+"') \
      RETURNING idRecipe, recipeName";
      db.query(query, function(err,recipe){
        console.log(err);
        if (err)
          errorHandler(err, res);
        else{
          // Transform to json objects (see Models);
          recipe = new Recipe(recipe[0].idrecipe,recipe[0].recipename);
          // Send result 201 (created)
          res.status(201).send({
            "status": 201,
            "message": "Recipe successfully added",
            "recipe": recipe
          });
        }
      });
    }else{
      var err = new Error("Bad query ! (Missing 'recipeName' in body)");
      err.http_code = 400;
      errorHandler(err,res);
    }

  },

  deleteRecipe: function(req, res){
    // Parse request
    var recipeId = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));

    // Query to delete recipe

    var query = "DELETE FROM RECIPES WHERE IDRECIPE = '"+recipeId+"' AND IDUSER = '"+user_id+"' RETURNING IDRECIPE, RECIPENAME";
    db.query(query, function(err,recipe){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        // The item got deleted
        if (recipe[0])
        {
          var recipe = new Recipe(recipe[0].idrecipe, recipe[0].recipename);
          // Send result 200
          res.status(200).send({
            "status": 200,
            "message": "Recipe successfully deleted",
            "oldRecipe": recipe
          });
        }else{ // The item didn't exist or wasn't the token owner's
          var err = new Error("Recipe not found !");
          err.http_code = 404;
          errorHandler(err,res);
        }

      }
    });
  },

  modifyRecipe: function(req, res){
    // Parse args
    var recipeid = req.params.id;
    var newName = req.body.recipeName;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    if (newName){
      var query = "UPDATE RECIPES SET recipeName = '"+newName+"' \
      WHERE idRecipe = '"+recipeid+"' AND idUser = '"+user_id+"' RETURNING idRecipe, recipeName";
      db.query(query, function(err,recipe){
        console.log(err);
        if (err)
          errorHandler(err, res);
        else{
          // The item got deleted
          if (recipe[0])
          {
            var recipe = new Recipe(recipe[0].idrecipe, recipe[0].recipename);
            // Send result 200
            res.status(200).send({
              "status": 200,
              "message": "Recipe successfully modified",
              "recipe": recipe
            });
          }else{ // The item didn't exist or wasn't the token owner's
            var err = new Error("Recipe not found !");
            err.http_code = 404;
            errorHandler(err,res);
          }

        }
      });

    }else{
      var err = new Error("Bad query ! (Missing 'recipeName')");
      err.http_code = 400;
      errorHandler(err,res);
    }

  },

  getRecipe: function(req, res){
    var recipeId = req.params.id;
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    query = "SELECT * \
             FROM RECIPES RIGHT JOIN RECIPEITEMS ON RECIPES.IDRECIPE = RECIPEITEMS.IDRECIPE \
             LEFT JOIN ITEMS ON RECIPEITEMS.IDITEM = ITEMS.IDITEM \
             WHERE RECIPES.IDRECIPE = '"+recipeId+"' AND RECIPES.IDUSER = "+user_id;
    // Query for result, store in item
    db.query(query, function(err,recipeItems){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
        db.query("SELECT * FROM RECIPES WHERE IDRECIPE = '"+recipeId+"' AND IDUSER = '"+user_id+"'", function(err,recipe){
          console.log(err);
          if (err)
            errorHandler(err, res);
          else{
            // If a recipe if found for this user
            if (recipe[0]){
              // Transform recipe to Json object (see model)
              var recipeObj = new Recipe(recipe[0].idrecipe, recipe[0].recipename);
              // If there's items in recipe
              if (recipeItems[0]){
                for (i = 0;i<recipe.length;i++){
                  recipeItems[i] = new Item(recipeItems[i].iditem,recipeItems[i].itemname);
                }//For
              } // RecipeItems

              res.status(200).send({
                "status": 200,
                "message": "Recipe successfully retrieved",
                "recipe": recipeObj,
                "recipeItems": recipeItems
              });
            }else{
              var err = new Error("Recipe not found !");
              err.http_code = 404;
              errorHandler(err,res);
            }

          }// Second query passed

        }); // 2nd Query
      } // First query passed
    }); // 1st Query
  },

  addItemToRecipe: function(req,res){
    // Parse request
    var recipeId = req.params.id;
    // Query to add given item in recipe
    var user_id = tokenAnalyzer.getUserId(tokenAnalyzer.grabToken(req));
    var idItem = req.body.idItem;
    var quantity = req.body.quantity;

    if (idItem == undefined){
      var err = new Error("Bad query");
      err.http_code = 400;
      errorHandler(err,res);
      return;
    }

    if (quantity == undefined)
      quantity = 0;


    isOwnerOf(user_id,recipeId,idItem,function(err,isOwner){
      if (err){
        errorHandler(err,res);
      }else{

      var query = "INSERT INTO RECIPEITEMS (idRecipe,idItem,quantity) \
                    VALUES ('"+recipeId+"','"+idItem+"','"+quantity+"') \
                    RETURNING idRecipe, (SELECT recipeName FROM RECIPES WHERE idUser = '"+user_id+"' AND idRecipe = '"+recipeId+"')";


        // Query to add an item
        db.query(query, function(err,recipe){
          console.log(err);
          if (err)
            errorHandler(err, res);
          else{
              // Send a 201 (created)
              var recipe = new Recipe(recipe[0].idrecipe, recipe[0].recipename);

              res.status(201).send({
                "status": 201,
                "message": "Item added to recipe",
                "recipe": recipe
              });
          }
        });
      }
    });
  },

  deleteItemInRecipe: function(req,res){
    // Parse request
    var recipeId = req.params.recipe_id;
    var idItem = req.params.item_id;
    var user_id = tokenAnalyze.getUserId(tokenAnalyzer.grabToken(req));
    // Query to remove item from recipe

    if (idItem == undefined){
      var err = new Error("Bad query (Missing parameter)");
      err.http_code = 400;
      errorHandler(err,res);
    }

    isOwnerOf(user_id,recipeId,idItem,function(err,isOwner){
      if (err){
        errorHandler(err,res);
      }else{

      var query = "DELETE FROM RECIPEITEMS WHERE idItem = '"+idItem+"' AND idRecipe = '"+recipeId+"'\
                    RETURNING idRecipe, (SELECT recipeName FROM RECIPES WHERE idUser = '"+user_id+"' AND idRecipe = '"+recipeId+"')";


    // Query to add an item
    db.query(query, function(err,recipe){
      console.log(err);
      if (err)
        errorHandler(err, res);
      else{
          // Send a 200
          var recipe = new Recipe(recipe[0].idrecipe, recipe[0].recipename);

          res.status(200).send({
            "status": 200,
            "message": "Item deleted from recipe",
            "recipe": recipe
          });
        } // Query passed
      }); // Query
    } // ifIsOwnerOf
  }); // isOwnerOf
},

  modifyItemInRecipe: function(req,res){
    // Parse request
    var recipeId = req.params.recipe_id;
    var itemId = req.params.item_id;
    var newQuantity = req.body.quantity;

    if (quantity == undefined){
      var err = new Error("Bad query (Missing 'quantity' in body)");
      err.http_code = 400;
      errorHandler(err,res);
    }

    isOwnerOf(user_id,recipeId,idItem,function(err,isOwner){
      if (err){
        errorHandler(err,res);
      }else{
        // The user is the owner of the item and the recipe
        // Query to modify the item in recipe
        var query = "UPDATE RECIPEITEMS SET quantity = '"+newQuantity+"' \
        WHERE idItem = '"+itemId+"' AND idRecipe = '"+recipeId+"' \
        RETURNING idRecipe, quantity";
        db.query(query, function(err,recipe){
          console.log(err);
          if (err)
            errorHandler(err, res);
          else{
              // Send a 200
              var recipe = new Recipe(recipe[0].idrecipe);

              res.status(200).send({
                "status": 200,
                "message": "Item modified in recipe",
                "recipe": recipe
              });
            } // Query passed
          }); // Query
      } // user authorized
    }); // isOwnerOf

  }




};

function isOwnerOf(idUser, idRecipe, idItem, fn) {
  db.query("SELECT * FROM RECIPES WHERE idUser = '"+idUser+"' AND idRecipe = '"+idRecipe+"'", function(err,recipe){
    console.log(err);
    if (err)
      fn(err,false);
    else{
      if (recipe[0]){
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
        var err = new Error("Recipe not found !");
        err.http_code = 404;
        return fn(err,false);
      }

    }
  });
}

module.exports = recipes;
