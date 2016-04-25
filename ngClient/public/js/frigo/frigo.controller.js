myApp.controller("FrigoCtrl", ['$scope','$location','ItemsFactory',
    function($scope, $location, ItemsFactory){
      // Initialisation des covoiturages
      $scope.items = [];

      $scope.addItemMenu = false;
      $scope.leftMenu = false;
      $scope.toggleAddMenu = function(){
        $scope.addItemMenu = !$scope.addItemMenu
      }

      $scope.toggleLeftMenu = function(){
        $scope.leftMenu = !$scope.leftMenu
      }
      // Populating $scope with DB
        ItemsFactory.getItems().then(function(data){
            $scope.items = data.data.items;
        });

      $scope.addItem = function(){
        ItemsFactory.addItem($scope.itemName, $scope.img).then(function(){
            $location.path('/monfrigo');
        });
      }


    }
]);
