myApp.factory('CategoriesFactory', function($window, $location, $http, AuthenticationFactory) {
  var _CategoriesFactory = {}

  _CategoriesFactory.getCategories = function() {
      return $http.get(APILINK+'/api/v1/categories').success(function(data){
        return (data.categories);
      }).success(function(data){
        console.log(data.status+': '+data.message);
      }).error(function(data){
        console.log(data.status+': '+data.message);
      });
    };


  _CategoriesFactory.modifyCategory = function(id, categoryName) {

    return $http.put(APILINK+'/api/v1/category/'+id, {
      CategoryName: categoryName
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  };


  _CategoriesFactory.deleteCategory = function(id) {
    return $http.delete(APILINK+'/api/v1/category/'+id).success(function(data){
      console.log(data);
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  _CategoriesFactory.addCategory = function(categoryName){
    return $http.post(APILINK+'/api/v1/categories', {
        categoryName: categoryName
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  return _CategoriesFactory;

});
