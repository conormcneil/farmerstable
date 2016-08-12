var app = angular.module('farmersTableApp',['ngRoute']);

app.config(["$routeProvider","$locationProvider","$httpProvider",function($routeProvider,$locationProvider,$httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
  $routeProvider
    .when('/', {
      templateUrl: 'partials/market-search.html'
    })
    .when('/markets', {
      templateUrl: "partials/market-list.html"
    })
    .when('/farms/:id', {
      templateUrl: 'partials/farm.html',
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
}])
.service('jwtInterceptor',function jwtInterceptor() {
  return {
    // request: function(config) {
    //   var addJWT = (config.url.indexOf('http://localhost:3000') > -1);
    //   var addHerokuJWT = (config.url.indexOf('https://farmerstable.herokuapp.com') > -1);
    //   if (addHerokuJWT && localStorage.jwt || addJWT && localStorage.jwt) {
    //     console.log('Adding Header', config.url);
    //     config.headers.Authorization = 'Bearer ' + localStorage.jwt;
    //   }
    //   return config;
    }
  }
})
