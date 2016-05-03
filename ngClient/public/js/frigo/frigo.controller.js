myApp.controller("FrigoCtrl", ['$scope','$location','ItemsFactory','ProductsFactory','Product',
    function($scope, $location, ItemsFactory, ProductsFactory, Product){
      // Initialisation des covoiturages
      $scope.products = [];

      $scope.getProducts = function(){
        // Populating $scope with DB
          var products = Product.query(function(){
              $scope.products = products.products;
              var promise = Product.get({id: 5},function(){
                  console.log(promise.product.category);
              });
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


      $scope.addProduct = function(){
        ProductsFactory.addProduct($scope.productName, $scope.img).then(function(){
            $scope.leftMenu = false;
            $scope.addFormDisplayed = false;
            $scope.getProducts();
        });
    };

      $scope.modifyProduct = function(product){
          ProductsFactory.modifyProduct(product).then(function(){
             $scope.getProducts();
             product.modifying = false;
             product.selected = false;
          });
      };

      $scope.deleteProduct = function(product){
          ProductsFactory.deleteProduct(product).then(function(){
              alert("Supprimé !");
              $scope.getProducts();
          });

      };



    }
]);
