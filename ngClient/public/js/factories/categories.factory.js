myApp.factory('CategoriesFactory', function($http, APILINK) {
  var _CategoriesFactory = {};

  _CategoriesFactory.getCategories = function() {
      var promise = $http.get(APILINK+'/api/v1/categories').then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      });
      return promise;
      };


  _CategoriesFactory.modifyCategory = function(id, categoryName) {

    var promise = $http.put(APILINK+'/api/v1/category/'+id, {
      CategoryName: categoryName
    }).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    });
    return promise;
    };


  _CategoriesFactory.deleteCategory = function(id) {
    var promise = $http.delete(APILINK+'/api/v1/category/'+id).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    });
    return promise;
};

  _CategoriesFactory.addCategory = function(categoryName){
    var promise = $http.post(APILINK+'/api/v1/categories', {
        categoryName: categoryName
    }).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    });
    return promise;
};

  return _CategoriesFactory;

});
