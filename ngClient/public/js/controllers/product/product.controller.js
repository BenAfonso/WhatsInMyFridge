myApp.controller("ProductCtrl", ['$scope','$routeParams','Products','Items',
    function($scope,$routeParams,Products,Items){


      var id = $routeParams.id;
      Products.get({ id : id }, function(product){
        $scope.product = product;
      });

      $scope.currentDate = new Date();
      $scope.addItem = false;

      $scope.addItem = function(newItem){
        newItem.idProduct = id;
        newItem.max = newItem.quantity;
        Items.save(newItem, function(result){
          $scope.newItem = {};
          $scope.addItem = false;
          $scope.items.unshift(result);
          console.log(result);
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
        console.log(items);
        $scope.items = items;
        $scope.quantity = calculateQuantity()[0];
        $scope.max = calculateQuantity()[1];
      });


      var calculateQuantity = function(){
        var sum = 0;
        var max = 0;
        for (i = 0; i < $scope.items.length; i++){
          sum = sum + parseInt($scope.items[i].quantity);
          max = max + parseInt($scope.items[i].max);
          $scope.items[i].ratio = ($scope.items[i].quantity / $scope.items[i].max)*100;
        }
        return [parseInt(sum),parseInt(max)];
      };

    }
]);
