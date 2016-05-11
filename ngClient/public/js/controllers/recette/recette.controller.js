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
      });

      $scope.editQuantity = function(ingredient){
        if (ingredient.editing !== undefined){
          ingredient.editing = !ingredient.editing;
        }else{
          ingredient.editing = true;
        }
      };

      $scope.edit = function(ingredient){
        ingredient.update({recipe_id: })
        // TODO
      };

      $scope.updateItem = function(item){
        if (parseInt(item.quantity) === 0){ // If the stack is over (quantity == 0)
          Items.delete({id:item.idItem}, function(result){
            $scope.items.splice($scope.items.indexOf(item), 1);
          });
        }else{
          item.$update({id:item.idItem}, function(result){
            // Refresh only the item entry with AJAX call
            item.ratio = parseInt((result.quantity / result.max)*100);
            $scope.items[$scope.items.indexOf(item)] = item;
            $scope.product.setQuantityMaxRatio();
          });
        }

      };
      $scope.selectProduct = function(product){
        $scope.selectedProduct = product;
        $scope.selectedProduct.quantity = undefined;
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
