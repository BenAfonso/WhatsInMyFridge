myApp.controller("CoursesCtrl", ['$scope','Products',
    function($scope, Products){

      $scope.products = [];
      $scope.lowstocks = [];
      $scope.nostocks = [];
      Products.query(function(result){
        $scope.products = result;
        $scope.getLowStocks();

      });

      $scope.getLowStocks = function(){
        for (i=0; i<$scope.products.length; i++){
          if (($scope.products[i].quantity / $scope.products[i].max) < 0.2 && ($scope.products[i].max !== 0) ){
            $scope.lowstocks.push($scope.products[i]);
          } else if ($scope.products[i].max === 0) {
            $scope.nostocks.push($scope.products[i]);
          }
        }
      };

    }
]);
