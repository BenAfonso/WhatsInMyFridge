var myApp = angular.module('WIMF', ['ngRoute']);

myApp.constant('restlink','http://31.32.127.70:3000/');

myApp.config(function($routeProvider, $httpProvider) {


  $routeProvider
    .when('/login',{
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'RegisterCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/monfrigo', {
      templateUrl: 'partials/frigo/frigo.html',
      controller: 'RegisterCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/mescourses', {
      templateUrl: 'partials/courses/courses.html',
      controller: 'RegisterCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/mesrecettes', {
      templateUrl: 'partials/recettes/recettes.html',
      controller: 'RegisterCtrl',
      access: {
        requiredLogin: true
      }
    }).when('/', {
      templateUrl: 'partials/home/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: true
      }

  }).otherwise({
      redirectTo: '/login'
    });
});

myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
      if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    $rootScope.role = AuthenticationFactory.userRole;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});


myApp.controller("MainCtrl", ['$scope','$http','$location','UserAuthFactory',
    function($scope,$http,$location,UserAuthFactory){
        $scope.logout=function(){
          UserAuthFactory.logout();
        }

        $scope.go = function(path){
          $location.path(path);
        }

        $scope.toggleNav = function(){
          if ($scope.isOpenedNav()) $scope.navstate = false;
          else $scope.navstate = true;
        }
        $scope.isOpenedNav = function(){
          return $scope.navstate;
        }

    }
]);