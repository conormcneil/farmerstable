var app = angular.module('farmersTableApp',['ngRoute']);

app.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/market-search.html'
    })
    // .when('/markets', {
    //   templateUrl: 'partials/market-map.html'
    // })
    .when('/farmers', {
      templateUrl: 'partials/farms.html',
      controllers: 'FarmsController'
    })
    .when('/users', {
      templateUrl: 'partials/users.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);
