myApp.controller("ProductCtrl", ['$scope','$routeParams','Products','Items',
    function($scope,$routeParams,Products,Items){


      var id = $routeParams.id;
      Products.get({ id : id }, function(product){
        $scope.product = product;
      });


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
          sum = sum + $scope.items[i].quantity;
          max = max + $scope.items[i].max;
        }
        return [parseInt(sum),parseInt(max)];
      };

    }
]);
