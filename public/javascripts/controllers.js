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
    if ($scope.forms[form] === true) {
      $scope.forms[form] = false;
    } else {
      $scope.forms.signin = false;
      $scope.forms.signup = false;
      // ^^^ close all active header forms first, then:
      FormService.toggle(form);
      $scope.forms = FormService.forms;
    }
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
    // empty signin form
    delete $scope.view.signin;
  };
  $scope.view.signout = function() {
    delete $scope.view.user;
    $scope.forms['user_nav'] = false;
    delete localStorage.token;
  };
  $scope.view.signup = function(email, username, password, passwordConfirm, farmerResponse) {
    var isFarmer = farmerResponse || false;
    if (password === passwordConfirm) {
      var user = {
        email: email,
        username: username,
        password: password,
        isFarmer: isFarmer
      }
    };
    // empty signup form
    delete $scope.view.signup;

    $http.post('/users/new',user).then(function(data) {
      // console.log(data);
    });
  };

};
makeHeaderController.$inject = ['$scope','$http','MarketService','FormService','UserService'];

// FarmsController
app.controller("FarmsController",makeFarmsController);
function makeFarmsController($scope,$http,$routeParams,GoogleMapsService,UserService,FormService) {
  $scope.view = {};
  // if user is logged in retrieve their info from Service: "activeUser"
  if(localStorage.token) {
    $scope.view.user = jwt_decode(localStorage.token).user;
    UserService.activeUser = $scope.view.user;
  }

  // Do I ever have to retrieve ALL farms?
  // Right now: YES, until my API returns nearest farms by zip
  $scope.view.zipDecode = function(zip) {
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zip;
    $http.get(url).then(function(data) {
      $scope.view.searchOrigin = data.data.results[0].geometry.location;
      // post to /farms/all and retrieve farms by zip
      var zipObj = {
        zip: zip,
        lat: $scope.view.searchOrigin.lat,
        lng: $scope.view.searchOrigin.lng
      }
      $http.post('/farms/all',zipObj).then(function(data) {
        delete $scope.farms;
        $scope.farms = data.data;
      });
    });
  };
  function reverseGeo() {
    // add default location in case !localStorage.mapConditions
    var currentCenter = JSON.parse(localStorage.getItem('mapConditions'));
    var currentLat = currentCenter['center']['lat'];
    var currentLng = currentCenter['center']['lng'];
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLat + ',' + currentLng).then(function(data) {
      var currentZip = data.data.results[0].address_components[data.data.results[0].address_components.length-1].long_name;
      var currentObj = {
        zip: currentZip,
        lat: currentLat,
        lng: currentLng
      };
      $http.post('/farms/all',currentObj).then(function(data) {
        delete $scope.farms;
        $scope.farms = data.data;
      })
    });
  };
  reverseGeo();

  // if url has route param: id, set this to active farm
  if($routeParams.id) {
    $http.get(`/farms/details/${$routeParams.id}`).then(function(data) {
      $scope.farm = data.data;
      $http.get(`/csa/details/${$routeParams.id}`).then(function(data) {
        // console.log(data.data.products);
        var tempArr = data.data.products.split(',');
        var productsArr = tempArr.map(e => {
          return e.trim();
        });
        $scope.farm.csa = data.data;
        $scope.farm.csa.products = productsArr;
      });
    });
  };
  // uncomment here to see $scope.farm object
  // window.setTimeout(() => {
  //   console.log($scope.farm);
  //   console.log($scope.farm.csa);
  // },1000);

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

  $scope.forms = FormService.forms;
  $scope.view.toggle = function(form) {
    if ($scope.forms[form]) {
      $scope.forms[form] = false;
    } else {
      $scope.forms.signin = false;
      $scope.forms.signup = false;
      // ^^^ close all active header forms first, then:
      FormService.toggle(form);
      $scope.forms = FormService.forms;
    }
  };

  // CSA SIGNUP //
  $scope.view.csaSignup = function(user,csa) {
    var request = {
      user: user,
      csa: csa
    };
    $http.post('/csa/signup',request).then(function(data) {
      $scope.message = {};
      if(data.data === 'duplicate signup') { // if successful request
        $scope.message.error = 'You\'ve already signed up for this CSA'
      } else if(data.status !== 200) {
        $scope.message.error = 'Something really weird just happened.'
      }
      else {
        $scope.message.success = 'Successful signup!'
      }
    });
  };
};
makeFarmsController.$inject = ['$scope','$http','$routeParams','GoogleMapsService','UserService','FormService'];

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
  // get farm associated with current farmer
  if($scope.user.isFarmer) {
    getFarms($scope.user.id);
  } else {
    // get CSAs that the user follows
    userCsas($scope.user.id);
  }

  // CSA TAB //
  // FARMERS //
  function getFarms(id) {
    $http.get(`/farms/farmers/${id}`).then(function(farm) {
      $scope.user.farm = farm.data[0];
      // use farm id to get associated csa
      $http.get(`/csa/details/${$scope.user.farm.id}`).then(function(data) {
        $scope.user.farm.csa = data.data;
        (function(csa_id) {
          $http.get(`/csa/customers/${csa_id}`).then(function(data) {
            $scope.user.farm.csa.customers = data.data;
          });
        })($scope.user.farm.csa.id);
      });
    })
  };
  // USERS //
  function userCsas(id) {
    $http.get(`/csa/user/${id}`).then(function(data) {
      $scope.user.csas = data.data;
    });
  };

};
makeAccountController.$inject = ["$scope","$http","$routeParams","FormService","UserService"];
