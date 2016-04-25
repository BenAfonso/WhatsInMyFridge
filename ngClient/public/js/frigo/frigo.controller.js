myApp.controller("FrigoCtrl", ['$scope','ItemsFactory',
    function($scope, ItemsFactory){
      // Initialisation des covoiturages
      $scope.items = [];

      $scope.leftMenu = false;
      $scope.toggleLeftMenu = function(){
        $scope.leftMenu = !$scope.leftMenu
      }
      // Populating $scope with DB
        ItemsFactory.getItems().then(function(data){
            $scope.items = data.data.items;
        });

    }
]);
