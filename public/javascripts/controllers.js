// FarmersTableController
app.controller('FarmersTableController',makeFarmersTableController);
function makeFarmersTableController($scope,$http,MarketService){
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

// FarmsController
app.controller("FarmsController",makeFarmsController);
function makeFarmsController($scope,$http,FarmService) {
  $scope.view = {};
  $scope.farms = {};
  $scope.farms = FarmService.farms;
  $scope.view.log = function(item) {
    console.log(item);
  }
};
makeFarmsController.$inject = ['$scope','$http','FarmService'];
