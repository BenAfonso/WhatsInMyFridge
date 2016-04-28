myApp.factory('CategoriesFactory', function($window, $location, $http, AuthenticationFactory) {
  var _CategoriesFactory = {}

  _CategoriesFactory.getCategories = function() {
      return $http.get('http://localhost:3000/api/v1/categories').success(function(data){
        return (data.categories);
      }).success(function(data){
        console.log(data.status+': '+data.message);
      }).error(function(data){
        console.log(data.status+': '+data.message);
      });
    };


  _CategoriesFactory.modifyCategory = function(id, categoryName) {

    return $http.put('http://localhost:3000/api/v1/category/'+id, {
      CategoryName: categoryName
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  };


  _CategoriesFactory.deleteCategory = function(id) {
    return $http.delete('http://localhost:3000/api/v1/category/'+id).success(function(data){
      console.log(data);
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  _CategoriesFactory.addCategory = function(categoryName){
    return $http.post('http://localhost:3000/api/v1/categories', {
        categoryName: categoryName
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  return _CategoriesFactory;

});
