function checkConfirm(message) {
  // $scope.view.confirmBox = true;
  // for now, use browser confirm box; MVP+ ^^^
  return confirm(message);
};

// HeaderController
app.controller('HeaderController',makeHeaderController);
function makeHeaderController($scope,$http,FormService,UserService) {
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
    var user = {
      username: username,
      password: password
    };
    $http.post('/signin',user).then(function(data) {
      if(data.message) {
        console.log(data.message);
      }
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
      console.log(data.config.data);
      $scope.view.signin(data.config.data.username,data.config.data.password);
    });
  };
};
makeHeaderController.$inject = ['$scope','$http','FormService','UserService'];

// FarmsController
app.controller("FarmsController",makeFarmsController);
function makeFarmsController($scope,$http,$routeParams,GoogleMapsService,UserService,FormService,uiGmapIsReady) {
  $scope.view = {};
  $scope.message = {};
  // if user is logged in retrieve their info from Service: "activeUser"
  if(localStorage.token) {
    $scope.view.user = jwt_decode(localStorage.token).user;
    UserService.activeUser = $scope.view.user;
  }

  // get farm posts
  getPosts = function(id) {
    $http.post(`/farms/posts/${id}`,{id:$scope.farm.id}).then(function(data) {
      $scope.farm.posts = data.data;
    });
  };
  $scope.view.deletePost = function(id) {
    if (checkConfirm('Are you sure you want to permanently delete this post?')) {
      $http.delete(`/farms/deletepost/${id}`).then(function(data) {
        // console.log('deleted:',data);
        getPosts($scope.farm.id);
      });
    } else {
      return;
    }
  };

  function makeMarker(obj) {
    $scope.marker = {
       id: 0,
       coords: {
         latitude: obj.lat,
         longitude: obj.lng
       },
       options: {
         label: obj.name,
         title: obj.name,
         MarkerLabel: {
           text: 'Test text'
         }
       },
       // events: {}
       events: {
         dragend: function (marker, eventName, args) {
           $log.log('marker dragend');
           var lat = marker.getPosition().lat();
           var lon = marker.getPosition().lng();
           $log.log(lat);
           $log.log(lon);

           $scope.marker.options = {
             labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
             labelAnchor: "100 0",
             labelClass: "marker-labels"
           };
         }
       }
     };
  }

  // if url has route param: id, set this to active farm
  if($routeParams.id) {
    $http.get(`/farms/details/${$routeParams.id}`).then(function(data) {
      $scope.farm = data.data; // make farm object

      makeMap($scope.farm.lat,$scope.farm.lng,12);
      // make marker on map from farm address
      makeMarker($scope.farm);
      // // get farm posts
      getPosts($routeParams.id);
      // get csa details
      getCsa($scope.farm);
    });
  };
  // TODO
  // if ($routeParams !== undefined) {
  //   if ($routeParams.id == $scope.view.user.id)
  //     $scope.view.editMode = true;
  //   } else {
  //     $scope.view.editMode = false;
  //   }
  // }


  // retrieve nearest farms and make google map automatically on route load
  makeMap(currentLocation.lat,currentLocation.lng,3);
  nearestFarms(currentLocation.lat,currentLocation.lng); // gets nearest farms
  // this function is used for manual farm search by zip;
  // takes zip code => ordered list of nearest 10 farms
  $scope.view.farmSearch = function(zip) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zip;
    $http.get(url).then(function(data) {
      nearestFarms(data.data.results[0].geometry.location.lat,data.data.results[0].geometry.location.lng);
    });
  };

  // this function takes an array of farms => sets marker for each farm on googlemap
  function makeMarkers(arr) {
    $scope.markers = [];
    var ret = arr.map(function(e) {
      return $scope.markers.push({
        id: $scope.markers.length,
        coords: {
          latitude: e.lat,
          longitude: e.lng,
        },
        title: e.name
      });
    });
    // console.log($scope.markers);
    return $scope.markers;
  };

  function nearestFarms(lat,lng) {
    // console.log(JSON.parse(localStorage.getItem('mapConditions')));
    // add default location in case !localStorage.mapConditions
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng).then(function(data) {
      var currentZip = data.data.results[0].address_components[data.data.results[0].address_components.length-1].long_name;
      var currentObj = {
        zip: currentZip,
        lat: lat,
        lng: lng
      };
      $http.post('/farms/all',currentObj).then(function(data) {
        delete $scope.farms;
        $scope.farms = data.data;
        $scope.farms.splice(10,$scope.farms.length-1);
        makeMarkers($scope.farms);
        var silentArr = $scope.farms.reduce(function(prev,curr) {
          getCsa(curr);
          return prev;
        },[]);
      })
    });
  };
  function getCsa(farm) {
    $http.get(`/csa/details/${farm.id}`).then(function(data) {
      if (data.data) { // data.data is csa object returned from API
        var tempArr = data.data.products.split(',');
        var productsArr = tempArr.map(e => {
          return e.trim();
        });
        farm.csa = data.data;
        farm.csa.products = productsArr;
        return farm;
      } else {
        return farm;
      }
    });
  }
  function makeMap(lat,lng,zoom,markers) {
    $scope.map = {
         center : {
             latitude: lat,
             longitude: lng
         },
         zoom : zoom || 8,
         control : {}
     };
  };
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
    if(!$scope.view.user) {
      $scope.message.error = 'Sign in or sign up to sign up for CSAs!'
    } else {
      var request = {
        user: user,
        csa: csa
      };
      $http.post('/csa/signup',request).then(function(data) {
        // TODO put this line into api route to respond with specific errors
        // anticipate specific errors and respond to user with specific error messages
        // res.status(400).send("Stupid Question")
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

  if (!$scope.map) {
    $scope.map = {
      center : {
        latitude: 37.7749295,
        longitude: -122.4194155
      },
      zoom : 12,
      control : {}
    };
  };

  uiGmapIsReady.promise()
  .then(function (map_instances) {
     var map1 = $scope.map.control.getGMap();    // get map object through $scope.map.control getGMap() function
     var map2 = map_instances[0].map;            // get map object through array object returned by uiGmapIsReady promise
  });

  $scope.view.filterBy = function(boolean) {
    if (boolean) {
      var arr = $scope.farms.filter(function(e) {
        if (e.csa) {
          return e;
        }
        return;
      });
      $scope.farms = arr;
      makeMarkers($scope.farms);
      } else {
      // get farms again
      nearestFarms(currentLocation.lat,currentLocation.lng);
      makeMarkers($scope.farms);
    };
  };
};
makeFarmsController.$inject = ['$scope','$http','$routeParams','GoogleMapsService','UserService','FormService','uiGmapIsReady'];

app.controller("AccountController",makeAccountController);
function makeAccountController($scope,$http,$routeParams,FormService,UserService) {
  $scope.view = {};
  $scope.view.message = {};
  $scope.forms = {};
  $scope.forms = FormService.forms;
  $scope.toggle = function(form) {
    if ($scope.forms[form] === true) {
      return;
    } else {
      FormService.toggle(form);
      $scope.forms = FormService.forms;
    };
  };
  $scope.user = UserService.activeUser;
  // get farm associated with current farmer
  if($scope.user.isFarmer) {
    getFarms($scope.user.id);
  } else {
    // get CSAs that the user follows
    userCsas($scope.user.id);
  };
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
    });
  };
  // USERS //
  function userCsas(id) {
    $http.get(`/csa/user/${id}`).then(function(data) {
      $scope.user.csas = data.data;
    });
  };
  function postToFarm(post) {
    console.log('post message');
    $http.post(`/farms/newpost/`,post).then(function(data) {
      console.log("POSTED",data);
    });
  };
  $scope.view.sendMessage = function(sendFrom,sendTo,subject,body,post) {
    // delete $scope.view.message;
    // view.message.sendTo,view.message.subject,view.message.body,view.message.post
    if (post) {
      var postObj = {
        farm_id: $scope.user.farm.id,
        sent_to: sendTo,
        subject: subject,
        body: body,
        date: Date.now().toString()
      };
      postToFarm(postObj);
    };
    if (sendTo === 'all') {
      sendTo = $scope.user.farm.csa.customers.reduce(function(prev,curr) {
        prev.push(curr.email);
        return prev;
      },[]);
    }
    // 'Yo Face <conor@conorkingston.com>'
    var message = {
      sendFrom: sendFrom,
      sendTo: sendTo,
      subject: subject,
      body: body
    };
    $http.post('/mailgun/send',message).then(function(data) {
      $scope.message = '';
      if (data.data === 'success' || data.data === 'success all') {
        // IF MESSAGE SENDS SUCCESSFULLY:
        $scope.view.message.sendTo = 'all';
        delete $scope.view.message.subject;
        delete $scope.view.message.body;
        delete $scope.view.message.post;
        $scope.message.success = 'message(s) sent successfully';
        console.log($scope.message.success);
      } else {
        $scope.message.error = 'oops';
        console.log($scope.message);
      }
    });
  };
};
makeAccountController.$inject = ["$scope","$http","$routeParams","FormService","UserService"];
