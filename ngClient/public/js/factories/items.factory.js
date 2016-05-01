myApp.factory('ItemsFactory', function(APILINK, $http) {
  var _ItemsFactory = {}

  // Add sorting functions to getItems
  _ItemsFactory.getItems = function() {
      var promise = $http.get(APILINK+'/api/v1/items').then(function(response){
          return (response.data);
      }, function(error){ // An error occured
          console.log(error);
      })
      return promise;
      };

  _ItemsFactory.getItem = function(id) {
    var promise = $http.get(APILINK+'/api/v1/item/'+id).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    })
    return promise;
    };

  _ItemsFactory.modifyItem = function(item) {

    var promise = $http.put(APILINK+'/api/v1/item/'+item.idItem, {
      itemName: item.itemName,
      quantity: item.quantity
    }).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    })
    return promise;
    };


  _ItemsFactory.deleteItem = function(item) {
    var promise = $http.delete(APILINK+'/api/v1/item/'+item.idItem).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    })
    return promise;
    };

  _ItemsFactory.addItem = function(idProduct, itemName, quantity){
    var promise = $http.post(APILINK+'/api/v1/items', {
        idProduct: idProduct,
        itemName: itemName,
        quantity: quantity
    }).then(function(response){
        return (response.data);
    }, function(error){ // An error occured
        console.log(error);
    })
    return promise;
    };

  return _ItemsFactory;

});
