myApp.factory('ItemsFactory', function($window, APILINK, $location, $http, AuthenticationFactory) {
  var _ItemsFactory = {}

  // Add sorting functions to getItems
  _ItemsFactory.getItems = function() {
      return $http.get(APILINK+'/api/v1/items').success(function(data){
        return (data.items);
      }).success(function(data){
        console.log(data.status+': '+data.message);
      }).error(function(data){
        console.log(data.status+': '+data.message);
      });
    };

  _ItemsFactory.getItem = function(id) {
    return $http.get(APILINK+'/api/v1/item/'+id).success(function(data){
      return (data.item);
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  };

  _ItemsFactory.modifyItem = function(item) {

    return $http.put(APILINK+'/api/v1/item/'+item.idItem, {
      itemName: item.itemName,
      img: item.img,
      idCategory: item.idCategory
    });
  };

  _ItemsFactory.setStock = function(id,stock) {
    return $http.put(APILINK+'/api/v1/item/'+id+'/stock', {
      quantity: stock
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  _ItemsFactory.deleteItem = function(item) {
    return $http.delete(APILINK+'/api/v1/item/'+item.idItem).success(function(data){
      console.log(data);
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  _ItemsFactory.addItem = function(itemName, img){
    return $http.post(APILINK+'/api/v1/items', {
        itemName: itemName,
        img: img
    }).success(function(data){
      console.log(data.status+': '+data.message);
    }).error(function(data){
      console.log(data.status+': '+data.message);
    });
  }

  return _ItemsFactory;

});
