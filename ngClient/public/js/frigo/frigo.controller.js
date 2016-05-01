myApp.controller("FrigoCtrl", ['$scope','$location','ItemsFactory','ProductsFactory',
    function($scope, $location, ItemsFactory, ProductsFactory){
      // Initialisation des covoiturages
      $scope.items = [];

      $scope.getItems = function(){
        // Populating $scope with DB
          ProductsFactory.getProducts().then(function(data){
              $scope.items = data.products;
          });
      }

      $scope.addItemMenu = false;
      $scope.leftMenu = false;
      $scope.showFiltersMenu = false;
      $scope.showSortingMenu = false;
      $scope.addFormDisplayed = false;
      $scope.getItems();

      $scope.toggleAddForm = function(){
          $scope.addFormDisplayed = !$scope.addFormDisplayed
      }

      $scope.selectItem = function(item){
          if (item.modifying)
            return;
          if (item.selected !== undefined)
            item.selected = !item.selected;
          else
            item.selected = true;
      }

      $scope.isSelected = function(item){
          return item.selected;
      }

      $scope.toggleModifyItem = function(item){
          if (item.modifying !== undefined)
            item.modifying = !item.modifying;
          else
            item.modifying = true;
      }

      $scope.isModifying = function(item){
          return item.modifying;
      }
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
            $scope.addFormDisplayed = false;
            $scope.getItems();
        });
      }

      $scope.modifyItem = function(item){
          ItemsFactory.modifyItem(item).then(function(){
             $scope.getItems();
             item.modifying = false;
             item.selected = false;
          });
      }

      $scope.deleteItem = function(item){
          ItemsFactory.deleteItem(item).then(function(){
              alert("Supprimé !");
              $scope.getItems();
          });

      }



    }
]);
