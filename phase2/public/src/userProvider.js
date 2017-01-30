var app = angular.module("users")
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/app',
        {
          templateUrl:    'app.html'
        });
       $routeProvider.otherwise(
    {
      redirectTo:     '/app'
    }
  );
});

app.controller('NavCtrl',
['$scope', '$location', function ($scope, $location) {

  if($location.path().length>3){
    $scope.currentNavItem = $location.path();
  }
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'all';
    return page === currentRoute ? 'active' : '';
  };
}]);

