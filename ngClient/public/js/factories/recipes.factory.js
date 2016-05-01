myApp.factory('RecipesFactory', function(APILINK, $http) {
  var _RecipesFactory = {};


    _RecipesFactory.getRecipes = function() {
        var promise = $http.get(APILINK+'/api/v1/recipes').then(function(response){
            return (response.data);
        }, function(error){ // An error occured
            console.log(error);
        });
        return promise;
    };


    _RecipesFactory.modifyRecipe = function(id, RecipeName) {

      var promise = $http.put(APILINK+'/api/v1/recipe/'+id, {
        recipeName: recipeName
      }).then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      });
      return promise;
  };


    _RecipesFactory.deleteRecipe = function(id) {
      var promise = $http.delete(APILINK+'/api/v1/recipe/'+id).then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      });
      return promise;
  };

    _RecipesFactory.addRecipe = function(recipeName){
      var promise = $http.post(APILINK+'/api/v1/recipes', {
          recipeName: recipeName
      }).then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      });
      return promise;
  };



  return _RecipesFactory ;

});
