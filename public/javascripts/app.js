var app = angular.module('farmersTableApp',['ngRoute','ngLoadScript']);

app.config(["$routeProvider","$locationProvider","$httpProvider",function($routeProvider,$locationProvider,$httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
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

/*global angular */
(function (ng) {
  'use strict';

  var app = ng.module('ngLoadScript', []);

  app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr)
      {
        if (attr.type==='text/javascript-lazy')
        {
          var s = document.createElement("script");
          s.type = "text/javascript";
          var src = elem.attr('src');
          if(src!==undefined)
          {
              s.src = src;
          }
          else
          {
              var code = elem.text();
              s.text = code;
          }
          document.head.appendChild(s);
          elem.remove();
        }
      }
    };
  });

}(angular));
