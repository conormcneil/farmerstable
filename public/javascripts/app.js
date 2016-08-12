var app = angular.module('farmersTableApp',['ngRoute']);

app.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/market-search.html'
    })
    .when('/markets', {
      templateUrl: "partials/market-list.html"
    })
    .when('/farms/:id', {
      templateUrl: 'partials/farms.html',
      controllers: 'FarmsController'
    })
    .when('/users/:id', {
      templateUrl: 'partials/users.html'
    })
    .when('/csa/:id/:csa_id', {
      templateUrl: 'partials/csa.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}]);
