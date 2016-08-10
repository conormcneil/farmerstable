// FarmersTableController
app.controller('FarmersTableController',makeFarmersTableController);
function makeFarmersTableController($scope,$http,MarketService){
  $scope.view = {};
  $scope.view.getMarkets = function(zip) {
    MarketService.getMarketsByZip(zip).then(function(data) {
      $scope.view.markets = data.data.results;
      $scope.view.moreMarkets = $scope.view.markets.splice(12,$scope.view.markets.length-1);
    });
  };
  $scope.view.marketInfo = function(id) {
    console.log(id);
    MarketService.getMarketById(id).then(function(data) {
      $scope.view.market = data.data.marketdetails;
      $scope.view.market.id = id;
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
