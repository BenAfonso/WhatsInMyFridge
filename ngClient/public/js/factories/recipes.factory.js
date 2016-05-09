myApp.factory("Recipes", function($resource,APILINK) {
  var Recipes = $resource(APILINK+"/api/v2/recipes/:id", {id: '@id'}, {
      query: {method: 'GET', isArray: true}
  });

  Recipes.prototype.getIngredients = function(){
    Ingredients.query({recipe_id: this.id}, function(ingredients){
        return ingredients;
    });
  };
  return Recipes;
});
