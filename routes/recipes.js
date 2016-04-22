var recipes = {
  getRecipes: function(req,res) {
    // Query for result, store in recipes
    res.status(200).json(recipes);
  },

  addRecipe: function(req,res) {
    // Parse args

    // Query to add a recipe

    // Send result 201 (created)
    res.status(201).send({
      "status": 201,
      "message": "Recipe successfully added"
    });
  },

  deleteRecipe: function(req, res){
    // Parse request
    var recipeId = req.params.id;
    // Check if it's user's recipe !
    //
    // Query to delete recipe
    //
    // Send result 200
    res.status(200).send({
      "status": 200,
      "message": "Recipe deleted"
    });
  },

  addItemToRecipe: function(req,res){
    // Parse request
    var recipeId = req.params.id;
    // Query to add given item in recipe
    //
    // Send result 201 (created)
    res.status(201).send({
      "status": 201,
      "message": "Item added to recipe"
    });
  },

  deleteItemInRecipe: function(req,res){
    // Parse request
    var recipeId = req.params.recipe_id;
    var itemId = req.params.item_id;
    // Query to remove item from recipe
    //
    // Send result
    res.status(200).send({
      "status": 200,
      "message": "Item deleted from recipe"
    });
  },

  modifyItemInRecipe: function(req,res){
    // Parse request
    var recipeId = req.params.recipe_id;
    var itemId = req.params.item_id;
    // Query to modify the item in recipe
    //
    // Send result
    res.status(200).send({
      "status": 200,
      "message": "Item modified in recipe"
    });
  }




};


module.exports = recipes;
