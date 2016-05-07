myApp.controller("RecettesCtrl", ['$scope','Recipes',
    function($scope, Recipes){
      $scope.recipes = [];

      Recipes.query(function(recipes){
        $scope.recipes = recipes;
      });

      $scope.addFormDisplayed = false;

      $scope.toggleAddForm = function(){
        $scope.addFormDisplayed = !$scope.addFormDisplayed;
      };

      $scope.addRecipe = function(recipe){
        Recipes.save(recipe,function(result){
          // Add the recipe to the recipes
          $scope.recipes.unshift(result);
          // Clear and hide the form
          $scope.newRecipe = {};
          $scope.addFormDisplayed = false;
        });
      };

      $scope.deleteRecipe = function(recipe){
        Recipes.delete({id: recipe.idRecipe},function(result){
          // Remove the recipe from the recipes (Ajax call)
          $scope.recipes.splice($scope.recipes.indexOf(recipe), 1);
        });
      };


    }
]);
