// FarmersTableController
app.controller('FarmersTableController',makeFarmersTableController);
function makeFarmersTableController($scope,$http,MarketService){
  $scope.view = {};
  $scope.view.getMarkets = function(zip) {
    MarketService.getMarketsByZip(zip).then(function(data) {
      $scope.view.markets = data.data.results;
      console.log($scope.view.markets);
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
