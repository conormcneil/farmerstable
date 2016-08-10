var app = angular.module('farmersTableApp',['ngRoute']);

app.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider) {
  $routeProvider
    .when('/farmers', {
      templateUrl: 'partials/farmers.html'
    });
    // .when('/resume', {
    //   templateUrl: 'partials/resume.html'
    // })
    // .otherwise({
    //   redirectTo: '/'
    // });
  $locationProvider.html5Mode(true);
}]);
