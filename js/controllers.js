app.controller('farmersTableController',['$scope','$http',function($scope,$http){
  $scope.view = {};

  $scope.view.getMarkets = function(zip) {
    console.log(zip);
  };

}]);
