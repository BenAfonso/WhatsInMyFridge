myApp.controller("RecetteCtrl", ['$scope','$routeParams','Recipes','Ingredients','Products',
    function($scope, $routeParams, Recipes, Ingredients, Products){
      $scope.recipe = {};
      $scope.products = [];
      Recipes.get({id: $routeParams.id}, function(recipe){
        $scope.recipe = recipe;
        console.log(recipe);
      });


      $scope.selectProduct = function(product){
        $scope.selectedProduct = product;
      };

      $scope.addIngredient = function(ingredient){
        // TODO
        Ingredients.save(ingredient, function(result){
          alert(result);
        });
      };

      Products.query(function(products){
        $scope.products = products;
      });

    }
]);
