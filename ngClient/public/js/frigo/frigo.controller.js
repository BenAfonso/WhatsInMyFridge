myApp.controller("FrigoCtrl", ['$scope','$location','ItemsFactory',
    function($scope, $location, ItemsFactory){
      // Initialisation des covoiturages
      $scope.items = [];

      $scope.getItems = function(){
        // Populating $scope with DB
          ItemsFactory.getItems().then(function(data){
              $scope.items = data.data.items;
          });
      }
      $scope.addItemMenu = false;
      $scope.leftMenu = false;
      $scope.showFiltersMenu = false;
      $scope.showSortingMenu = false;
      $scope.getItems();

      $scope.toggleAddMenu = function(){
        $scope.addItemMenu = !$scope.addItemMenu
      }

      $scope.toggleFiltersMenu = function(){
        $scope.showFiltersMenu = !$scope.showFiltersMenu
      }

      $scope.toggleSortingMenu = function(){
        $scope.showSortingMenu = !$scope.showSortingMenu
      }



      $scope.toggleLeftMenu = function(){
        $scope.leftMenu = !$scope.leftMenu
      }


      $scope.addItem = function(){
        ItemsFactory.addItem($scope.itemName, $scope.img).then(function(){
            $scope.leftMenu = false;
            $scope.addItemMenu = false;
            $scope.getItems();
        });
      }


    }
]);
