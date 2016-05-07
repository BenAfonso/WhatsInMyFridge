myApp.controller("ProductCtrl", ['$scope','$routeParams','Products','Items',
    function($scope,$routeParams,Products,Items){


      var id = $routeParams.id;
      Products.get({ id : id }, function(product){
        $scope.product = product;
      });

      $scope.currentDate = new Date();
      $scope.addItem = false;
      $scope.saveItem = function(newItem){
        newItem.idProduct = id;
        newItem.max = newItem.quantity;
        Items.save(newItem, function(result){
          // Reset the form and hide it
          $scope.newItem = {};
          $scope.addItem = false;
          // Initialize ratio to 100%
          result.ratio = 100;
          // Add the result to items (Ajax call)
          $scope.items.unshift(result);
          // Refresh the product infos
          $scope.quantity = $scope.quantity + parseInt(newItem.quantity);
          $scope.max = $scope.max + parseInt(newItem.max);
        });
      };

      $scope.showAddItem = function(){
        $scope.addItem = !$scope.addItem;
      };

      $scope.addItemShown = function(){
        return ($scope.addItem === true);
      };

      // This makes a GET /api/v2/items?product_id='id'
      Items.query({product_id: id},function(items){
        $scope.items = items;
        $scope.quantity = calculateQuantity()[0];
        $scope.max = calculateQuantity()[1];
      });

      $scope.editingItem = function(item){
        return item.editing;
      };

      $scope.toggleEditItem = function(item){
        if (item.editing !== undefined)
          item.editing = !item.editing;
        else
          item.editing = true;
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
            $scope.quantity = calculateQuantity()[0];
            $scope.max = calculateQuantity()[1];
          });
        }

      };

      var calculateQuantity = function(){
        var sum = 0;
        var max = 0;
        for (i = 0; i < $scope.items.length; i++){
          sum = sum + parseInt($scope.items[i].quantity);
          max = max + parseInt($scope.items[i].max);
          $scope.items[i].ratio = parseInt(($scope.items[i].quantity / $scope.items[i].max)*100);
        }
        return [parseInt(sum),parseInt(max)];
      };

    }
]);
