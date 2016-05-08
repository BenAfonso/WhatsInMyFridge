myApp.controller("RecetteCtrl", ['$scope','$routeParams','Recipes','Ingredients','Products',
    function($scope, $routeParams, Recipes, Ingredients, Products){
      $scope.recipe = {};
      $scope.products = [];
      $scope.ingredients = [];

      Recipes.get({id: $routeParams.id}, function(recipe){
        $scope.recipe = recipe;
      });

      Ingredients.query({recipe_id: $routeParams.id}, function(ingredients){
        $scope.ingredients = ingredients;
        console.log(ingredients);
      });

      $scope.selectProduct = function(product){
        $scope.selectedProduct = product;
      };

      $scope.addIngredient = function(ingredient){
        ingredient.idRecipe = $routeParams.id;
        Ingredients.save({recipe_id: ingredient.idRecipe}, ingredient, function(ingredient){
          $scope.ingredients.unshift(ingredient);
        });
      };

      $scope.deleteIngredient = function(ingredient){
        Ingredients.delete({recipe_id: $routeParams.id, product_id: ingredient.idProduct}, function(){
          $scope.ingredients.splice($scope.ingredients.indexOf(ingredient), 1);
        });
      };

      Products.query(function(products){
        $scope.products = products;
      });

    }
]);
