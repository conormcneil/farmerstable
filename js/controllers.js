app.controller('farmersTableController',['$scope','$http',function($scope,$http){
  $scope.view = {};

  $scope.view.getMarkets = function(zip) {
    var url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zip;
    $http.get(url).then(function(data) {
      $scope.view.markets = data.data.results;
    });
  };
  $scope.view.moreInfo = function(id) {
    $scope.view.marketDetails = null;
    $scope.view.activeMarketId === id ? $scope.view.activeMarketId = null : $scope.view.activeMarketId = id;
    var url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + id;
    $http.get(url).then(function(data) {
      $scope.view.marketDetails = data.data.marketdetails;
      console.log(data.data.marketdetails);
    });
  };

}]);
