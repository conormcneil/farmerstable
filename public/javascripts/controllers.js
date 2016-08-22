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
  $scope.view.getLatLng = function(address) {
    console.log(address);
  }
};
makeFarmersTableController.$inject = ['$scope','$http','MarketService','GoogleMapsService'];

// HeaderController
app.controller('HeaderController',makeHeaderController);
function makeHeaderController($scope,$http,MarketService,FormService,UserService) {
  $scope.view = {};
  $scope.forms = {};
  $scope.forms = FormService.forms;
  $scope.view.toggle = function(form) {
    FormService.toggle(form);
    $scope.forms = FormService.forms;
  };
  $scope.view.signin = function(username,password) {
    // TODO: bcrypt here
    var user = {
      username: username,
      password: password
    };
    $http.post('/signin',user).then(function(data) {
      localStorage.jwt = data.data.token;
      $scope.view.user = data.data.user;
      UserService.activeUser = $scope.view.user;
    });
    $scope.view.username = '';
    $scope.view.password = '';
  };
  $scope.view.signout = function() {
    $scope.view.user = null;
    $scope.forms['user_nav'] = false;
  }
};
makeHeaderController.$inject = ['$scope','$http','MarketService','FormService','UserService'];

// FarmsController
app.controller("FarmsController",makeFarmsController);
function makeFarmsController($scope,$http,$routeParams,FarmService,GoogleMapsService) {
  $scope.view = {};
  $scope.farms = {};
  $scope.farms = FarmService.farms;
  $scope.getFarm = function(id) {
    $scope.farm = FarmService.getFarm(id)[0];
    $scope.view.getLatLng($scope.farm.address);
  };
  $scope.view.getLatLng = function(address) {
    address = address.split(' ').join('+');
    GoogleMapsService.getLatLng(address).then(function(data) {
      $scope.view.latLng = data.data.results[0].geometry.location;
      var marker = new google.maps.Marker({
        position: $scope.view.latLng,
        map: map
      });
      map.setCenter(marker.position);
    });
  };
  $scope.getFarm($routeParams.id);
};
makeFarmsController.$inject = ['$scope','$http','$routeParams','FarmService','GoogleMapsService'];

app.controller("UsersController",makeUsersController);
function makeUsersController($scope,$http,$routeParams,UserService) {
  $scope.view = {};
  $scope.view.greeting = 'hello users';
  $scope.view.user = UserService.users[0];
  $scope.view.getLatLng = function(address) {
    address = address.split(' ').join('+');
    GoogleMapsService.getLatLng(address).then(function(data) {
      $scope.view.latLng = data.data.results[0].geometry.location;
      console.log($scope.view.latLng);
      var marker = new google.maps.Marker({
          position: $scope.view.latLng,
          map: map,
          title: 'I did it!'
        });
      map.setCenter(marker.position);
    });
  };
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

app.controller("AccountController",makeAccountController);
function makeAccountController($scope,$http,$routeParams,FormService,FarmService,UserService) {
  $scope.view = {};
  $scope.view.greeting = "accounts";
  $scope.forms = {};
  $scope.forms = FormService.forms;
  $scope.toggle = function(form) {
    if ($scope.forms[form] === true) {
      return;
    } else {
      FormService.toggle(form);
      $scope.forms = FormService.forms;
    }
  };
  $scope.user = UserService.activeUser;
  $scope.user.farm = {};
  // get farm associated with current user
};
makeAccountController.$inject = ["$scope","$http","$routeParams","FormService","FarmService","UserService"];
