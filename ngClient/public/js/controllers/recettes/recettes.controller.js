myApp.controller("RecettesCtrl", ['$scope','Recipes','Ingredients',
    function($scope, Recipes, Ingredients){
      $scope.recipes = [];


      // Add the ingredients to the given Recipe
      var addIngredients = function(recipe){
        Ingredients.get({recipe_id: recipe.idRecipe}, function(ingredients){
            recipe.ingredients = ingredients;
            for (i=0;i<recipe.ingredients.length;i++){
              if (recipe.ingredients[i].product.quantity >= recipe.ingredients[i].quantity){
                recipe.ingredients[i].enough = true;
              }else{
                console.log(recipe.ingredients[i]);
                recipe.ingredients[i].enough = false;
              }
            }
        });

      };

      // Populate the scope with ingredients
      $scope.populateIngredients = function(){
        for (i=0;i<$scope.recipes.length;i++){
          addIngredients($scope.recipes[i]);
        }
      };

      Recipes.query(function(recipes){
        $scope.recipes = recipes;
        $scope.populateIngredients();
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
