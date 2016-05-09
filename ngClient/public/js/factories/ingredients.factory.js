myApp.factory("Ingredients", function($resource,APILINK) {
  var Ingredients = $resource(APILINK+"/api/v2/recipes/:recipe_id/ingredients/:product_id", {recipe_id: '@recipe_id', product_id: '@product_id'}, {
      query: {method: 'GET', isArray: true},
      get: {method: 'GET', isArray: true}
  });

  Ingredients.prototype.getProduct = function(){
    Products.get({id: this.product.idProduct}, function(product){
      return product;
    });
  };
  return Ingredients;
});
