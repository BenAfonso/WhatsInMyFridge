myApp.factory('ListsFactory', function($window, $location, $http, APILINK, AuthenticationFactory) {
  var _ListsFactory = {}

  _ListsFactory.getLists = function() {
      return $http.get(APILINK+'/api/v1/lists').success(function(data){
        return (data.lists);
      }).success(function(data){
        console.log(data.status+': '+data.message);
      }).error(function(data){
        console.log(data.status+': '+data.message);
      });
    };


  _ListsFactory.modifyList = function(id, listName) {

    return $http.put(APILINK+'/api/v1/list/'+id, {
      listName: listName
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  };


  _ListsFactory.deleteList = function(id) {
    return $http.delete(APILINK+'/api/v1/list/'+id).success(function(data){
      console.log(data);
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  _ListsFactory.addList = function(listName){
    return $http.post(APILINK+'/api/v1/lists', {
        listName: listName
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  _ListsFactory.addItemToList = function (id, idItem){
    return $http.post(APILINK+'/api/v1/list/'+id, {
      idItem: idItem
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  _ListsFactory.deleteItemFromList = function (id, idItem){
    return $http.delete(APILINK+'/api/v1/'+id+'/item/'+iditem).success(function(data){
      console.log(data);
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }
  return _ListsFactory;

});
