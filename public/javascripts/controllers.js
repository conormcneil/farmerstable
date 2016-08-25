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
    });
  };
};
makeFarmersTableController.$inject = ['$scope','$http','MarketService','GoogleMapsService'];

// HeaderController
app.controller('HeaderController',makeHeaderController);
function makeHeaderController($scope,$http,MarketService,FormService,UserService) {
  $scope.view = {};
  $scope.forms = {};
  $scope.forms = FormService.forms;

  if(localStorage.token) {
    $scope.view.user = jwt_decode(localStorage.token).user;
    UserService.activeUser = $scope.view.user;
  }

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
      localStorage.token = data.data.token;
      $scope.view.user = data.data.user;
      UserService.activeUser = $scope.view.user;
    });
    $scope.view.username = '';
    $scope.view.password = '';
  };
  $scope.view.signout = function() {
    $scope.view.user = null;
    $scope.forms['user_nav'] = false;
    delete localStorage.token;
  }
};
makeHeaderController.$inject = ['$scope','$http','MarketService','FormService','UserService'];

// FarmsController
app.controller("FarmsController",makeFarmsController);
function makeFarmsController($scope,$http,$routeParams,GoogleMapsService,UserService) {
  $scope.view = {};
  // if user is logged in retrieve their info from Service: "activeUser"
  if(localStorage.token) {
    $scope.view.user = jwt_decode(localStorage.token).user;
    UserService.activeUser = $scope.view.user;
  }

  // Do I ever have to retrieve ALL farms?
  // Right now: YES, until my API returns nearest farms by zip
  $scope.farms = {};
  $http.get('/farms/all').then(function(data) {
    $scope.farms = data.data;
  });

  // if url has route param: id, set this to active farm
  if($routeParams.id) {
    $http.get(`/farms/details/${$routeParams.id}`).then(function(data) {
      $scope.farm = data.data;
      $http.get(`/csa/details/${$routeParams.id}`).then(function(data) {
        $scope.farm.csa = data.data;
      })
    });
  };
  window.setTimeout(() => {
    console.log($scope.farm.csa);
  },500);

  // $scope.getFarm = function(id) {
  //   // TODO FarmService => knex query
  //   $scope.farm = FarmService.getFarm(id)[0];
  //   $scope.view.getLatLng($scope.farm.address);
  // };
  $scope.view.centerMap = function(address) {
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
  // $scope.getFarm($routeParams.id);
};
makeFarmsController.$inject = ['$scope','$http','$routeParams','GoogleMapsService','UserService'];

app.controller("AccountController",makeAccountController);
function makeAccountController($scope,$http,$routeParams,FormService,UserService) {
  $scope.view = {};
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
  // get farm associated with current user (refactor)
  function getFarms(id) {
    $http.get(`/farms/farmers/${id}`).then(function(farm) {
      $scope.user.farm = farm.data[0];
      // use farm id to get associated csa
      $http.get(`/csa/details/${$scope.user.farm.id}`).then(function(data) {
        $scope.user.farm.csa = data.data;
      });
    });
  }
  getFarms($scope.user.id);
};
makeAccountController.$inject = ["$scope","$http","$routeParams","FormService","UserService"];


// app.controller("UsersController",makeUsersController);
// function makeUsersController($scope,$http,$routeParams,UserService) {
//   $scope.view = {};
//   $scope.view.user = UserService.users[0];
//   $scope.view.getLatLng = function(address) {
//     address = address.split(' ').join('+');
//     GoogleMapsService.getLatLng(address).then(function(data) {
//       $scope.view.latLng = data.data.results[0].geometry.location;
//       console.log($scope.view.latLng);
//       var marker = new google.maps.Marker({
//           position: $scope.view.latLng,
//           map: map,
//           title: 'I did it!'
//         });
//       map.setCenter(marker.position);
//     });
//   };
// }
// makeUsersController.$inject = ['$scope','$http','$routeParams','UserService'];

// app.controller("CSAController",makeCSAController);
// function makeCSAController($scope,$http,$routeParams) {
//   console.log('csa controller');
//   $scope.view = {};
//   $scope.view.greeting = 'hello CSA!';
//   $scope.farm = {};
//   // TODO FarmService => knex query
//   $scope.getFarm = function(id) {
//     $scope.farm = FarmService.getFarm(id)[0];
//   };
//   $scope.getFarm($routeParams.id);
// }
// makeCSAController.$inject = ['$scope','$http','$routeParams'];
