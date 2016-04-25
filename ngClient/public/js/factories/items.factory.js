myApp.factory('ItemsFactory', function($window, $location, $http, AuthenticationFactory) {
  var _ItemsFactory = {}

  _ItemsFactory.getItems = function() {
      return $http.get('http://localhost:3000/api/v1/items').success(function(data){
        return (data.items);
      });
    };

  _ItemsFactory.addItem = function(itemName, img){
    return $http.post('http://localhost:3000/api/v1/items', {
        itemName: itemName,
        img: img
    });
  }

  return _ItemsFactory;

});
