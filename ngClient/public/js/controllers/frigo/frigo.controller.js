myApp.controller("FrigoCtrl", ['$scope','Products',
    function($scope, Products){
      // Initialisation des covoiturages
      $scope.products = [];

      $scope.getProducts = function(){
        // Populating $scope with DB
          Products.query(function(result){
            $scope.products = result;
          });
      };

      $scope.addProductMenu = false;
      $scope.leftMenu = false;
      $scope.showFiltersMenu = false;
      $scope.showSortingMenu = false;
      $scope.addFormDisplayed = false;
      $scope.getProducts();

      $scope.toggleAddForm = function(){
          $scope.addFormDisplayed = !$scope.addFormDisplayed;
      };

      $scope.selectProduct = function(product){
          if (product.modifying)
            return;
          if (product.selected !== undefined)
            product.selected = !product.selected;
          else
            product.selected = true;
      };

      $scope.isSelected = function(product){
          return product.selected;
      };

      $scope.toggleModifyProduct = function(product){
          if (product.modifying !== undefined)
            product.modifying = !product.modifying;
          else
            product.modifying = true;
      };

      $scope.isModifying = function(product){
          return product.modifying;
      };
      $scope.toggleAddMenu = function(){
        $scope.addItemMenu = !$scope.addItemMenu;
      };

      $scope.toggleFiltersMenu = function(){
        $scope.showFiltersMenu = !$scope.showFiltersMenu;
    };

      $scope.toggleSortingMenu = function(){
        $scope.showSortingMenu = !$scope.showSortingMenu;
    };



      $scope.toggleLeftMenu = function(){
        $scope.leftMenu = !$scope.leftMenu;
    };


      $scope.addProduct = function(product){
        Products.save(product, function(result){
          // Add the just-posted product at first position of products with AJAX call
          $scope.products.unshift(result);
          $scope.newProduct = {};
          $scope.toggleAddForm();
        });

      };

      $scope.modifyProduct = function(product){
          product.$update({id:product.idProduct}, function(product){
              // Refresh only the product entry with AJAX call
              $scope.products[$scope.products.indexOf(product)] = product;
          });

      };

      $scope.deleteProduct = function(product){
          Products.delete({id:product.idProduct},function(result){
            // Remove the deleted item from the products list with Ajax call
            $scope.products.splice($scope.products.indexOf(product), 1);
          });

      };



    }
]);
