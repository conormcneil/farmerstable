// FarmersTableController
app.controller('FarmersTableController',makeFarmersTableController);
function makeFarmersTableController($scope,$http,MarketService){
  $scope.view = {};
  $scope.view.getMarkets = function(zip) {
    MarketService.getMarketsByZip(zip).then(function(data) {
      $scope.view.markets = data.data.results;
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
    var addressString = '';
    var arr = [];
    arr = address.split(' ').join('+');
    console.log(arr);
    console.log("address: ", address);
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBIY03seu1Mt8H5G-Tleh8_rII0t97gBGg';
    $http.get(url).then(function(data) {
      console.log(data.data.results);
    });
  };
};
makeFarmersTableController.$inject = ['$scope','$http','MarketService'];

// HeaderController
app.controller('HeaderController',makeHeaderController);
function makeHeaderController($scope,MarketService,FormService) {
  $scope.view = {};
  $scope.forms = {};

  $scope.forms = FormService.forms;

  $scope.view.toggle = function(form) {
    FormService.toggle(form);
    $scope.forms = FormService.forms;
  };
  $scope.view.signin = function(username,password) {
    console.log(username,password);
  };
};
makeHeaderController.$inject = ['$scope','MarketService','FormService'];
