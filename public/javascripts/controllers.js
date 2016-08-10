app.controller('farmersTableController',['$scope','$http','MarketService',function($scope,$http,MarketService){
  $scope.view = {};
  $scope.view.getMarkets = function(zip) {
    MarketService.getMarketsByZip(zip).then(function(data) {
      $scope.view.markets = data.data.results;
    });
  };
  // $scope.view.market = MarketService.getMarketById(id);
  $scope.view.moreInfo = function(id) {
    $scope.view.marketDetails = null;
    $scope.view.activeMarketId === id ? $scope.view.activeMarketId = null : $scope.view.activeMarketId = id;
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
}]);
