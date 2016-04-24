myApp.factory('ItemsFactory', function($window, $location, $http, AuthenticationFactory) {
  var _ItemsFactory = {}

  _ItemsFactory.getItems = function() {
    return $http.get('http://localhost:3000/api/v1/items').success(function(data){
      return (data.items);
    });

    };

  return _ItemsFactory;

});
