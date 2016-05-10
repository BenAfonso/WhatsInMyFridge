myApp.controller("CoursesCtrl", ['$scope','Products',
    function($scope, Products){

      $scope.products = [];
      $scope.lowstocks = [];
      $scope.nostocks = [];

      $scope.settingsDisplayed = false;
      // Alert stock levels
      $scope.alertLevel3 = 0.1;
      $scope.alertLevel2 = 0.3;
      $scope.alertLevel1 = 0.5;
      Products.query(function(result){
        $scope.products = result;
        $scope.getLowStocks();
      });

      $scope.toggleSettings = function(){
        $scope.settingsDisplayed = !$scope.settingsDisplayed;
      };

      $scope.alertLevel = function(product){
        if ((product.quantity / product.max) < $scope.alertLevel3 || product.max === 0){
          product.critical = true;
          return 'critical';
        }else if ((product.quantity / product.max) < $scope.alertLevel2 ){
          product.alertLevel = 2;
          return 'alert';
        }else if ((product.quantity / product.max) < $scope.alertLevel1){
          product.alertLevel = 1;
          return 'warning';
        }else {
          product.alertLevel = 0;
          return 'cool';
        }
      };


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
