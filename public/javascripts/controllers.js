// FarmersTableController
app.controller('FarmersTableController',makeFarmersTableController);
function makeFarmersTableController($scope,$http,MarketService,GoogleMapsService){
  $scope.view = {};
  $scope.view.getMarkets = function(zip) {
    MarketService.getMarketsByZip(zip).then(function(data) {
      var results = data.data.results;
      $scope.view.moreMarkets = results.splice(12,results.length-1);
      $scope.view.markets = results.map(function(e) {
        e.marketname = e.marketname.split('');
        if (e.marketname[0] === 'D') {
          e.marketname = e.marketname.join('');
          return e;
        }
        e.distanceFromZip = e.marketname.splice(0,4);
        e.distanceFromZip.splice(3,1);
        e.distanceFromZip = e.distanceFromZip.join('');
        e.marketname = e.marketname.join('');
        return e;
      });
    });
  };
  $scope.view.marketInfo = function(id) {
    MarketService.getMarketById(id).then(function(data) {
      $scope.view.market = data.data.marketdetails;
      $scope.view.market.id = id;
      console.log($scope.view.market);
    });
  };
  $scope.view.getLatLong = function(address) {
    console.log(address);
  }
};
makeFarmersTableController.$inject = ['$scope','$http','MarketService','GoogleMapsService'];

// HeaderController
app.controller('HeaderController',makeHeaderController);
function makeHeaderController($scope,$http,MarketService,FormService,jwtInterceptor) {
  $scope.view = {};
  $scope.forms = {};
  $scope.forms = FormService.forms;
  $scope.view.toggle = function(form) {
    FormService.toggle(form);
    $scope.forms = FormService.forms;
  };
  $scope.view.signin = function(username,password) {
    $http.get('/signin').then(function(data) {
      console.log("DATA: ",data);
      localStorage.jwt = data.data.token;
      $scope.view.user = data.data.user;
    });
  };
};
makeHeaderController.$inject = ['$scope','$http','MarketService','FormService','jwtInterceptor'];

// FarmsController
app.controller("FarmsController",makeFarmsController);
function makeFarmsController($scope,$http,$routeParams,FarmService,GoogleMapsService) {
  $scope.view = {};
  $scope.farms = {};
  $scope.farms = FarmService.farms;
  $scope.getFarm = function(id) {
    $scope.farm = FarmService.getFarm(id);
  };
  $scope.getFarm($routeParams.id);
  $scope.view.getLatLong = function(address) {
    address = address.split(' ').join('+');
    console.log(address);
    GoogleMapsService.getLatLong(address).then(function(data) {
      console.log(data);
    });
  };
  $scope.view.log = function(item) {
    console.log(item);
  };
};
makeFarmsController.$inject = ['$scope','$http','$routeParams','FarmService','GoogleMapsService'];

app.controller("UsersController",makeUsersController);
function makeUsersController($scope,$http,$routeParams,UserService) {
  $scope.view = {};
  $scope.view.greeting = 'hello users';
  $scope.view.user = UserService.users[0];
}
makeUsersController.$inject = ['$scope','$http','$routeParams','UserService'];

app.controller("CSAController",makeCSAController);
function makeCSAController($scope,$http,$routeParams,FarmService) {
  $scope.view = {};
  $scope.view.greeting = 'hello CSA!';
  $scope.farm = {};
  $scope.getFarm = function(id) {
    $scope.farm = FarmService.getFarm(id)[0];
  };
  $scope.getFarm($routeParams.id);
}
makeCSAController.$inject = ['$scope','$http','$routeParams','FarmService'];
