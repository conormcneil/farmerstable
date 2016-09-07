var app = angular.module('farmersTableApp',['ngRoute','uiGmapgoogle-maps']);

app.config(["$routeProvider","$locationProvider","$httpProvider",function($routeProvider,$locationProvider,$httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
  $routeProvider
    .when('/', {
      templateUrl: 'partials/curtain.html'
    })
    .when('/home', {
      templateUrl: 'partials/home.html'
    })
    // .when('/markets', {
    //   templateUrl: "partials/markets/market-search.html"
    // })
    .when('/farms', {
      templateUrl: 'partials/farms/farm-search.html'
    })
    .when('/farm/details/:id', {
      templateUrl: 'partials/farms/farm.html'
    })
    .when('/farm/csa/:id', {
      templateUrl: 'partials/farms/farm-csa.html'
    })
    .when('/csa', {
      templateUrl: 'partials/csa.html'
    })
    .when('/myaccount/', {
      templateUrl: 'partials/accounts/account.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDhtVdRd8z-_OzSEdxwsym11zRxGygotFc',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})
.service('jwtInterceptor',function jwtInterceptor() {
  return {
    request: function(config) {
      var addJWT = (config.url.indexOf('http://localhost:3000') > -1);
      var addHerokuJWT = (config.url.indexOf('https://farmerstable.herokuapp.com') > -1);
      if (addHerokuJWT && localStorage.jwt || addJWT && localStorage.jwt) {
        // console.log('Adding Header', config.url);
        config.headers.Authorization = 'Bearer ' + localStorage.jwt;
      }
      return config;
    }
  }
});
