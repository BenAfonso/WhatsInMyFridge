myApp.factory('IngredientsFactory', function(APILINK, $http) {
  var _IngredientsFactory = {};

    _IngredientsFactory.addIngredient = function(recipe_id, idProduct, quantity){
      var promise = $http.post(APILINK+'/api/v1/recipe/'+recipe_id, {
          idProduct: idProduct,
          quantity: quantity
      }).then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      });
      return promise;
  };

    _IngredientsFactory.modifyIngredient = function(recipe_id, product_id, quantity) {

      var promise = $http.put(APILINK+'/api/v1/recipe/'+recipe_id+'/product/'+product_id, {
        quantity: quantity
      }).then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      });
      return promise;
  };


    _IngredientsFactory.deleteIngredient = function(recipe_id,product_id) {
      var promise = $http.delete(APILINK+'/api/v1/recipe/'+recipe_id+'/product/'+product_id).then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      });
      return promise;
  };

return _IngredientsFactory ;

});
