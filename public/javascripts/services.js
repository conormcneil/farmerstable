app.factory("MarketService",function($http) {
  return {
    getMarketsByZip: function(zip) {
      var url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zip;
      return $http.get(url);
    },
    getMarketById: function(id) {
      var url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + id;
      $http.get(url).then(function(data) {
        console.log(data.data.marketdetails);
        return data.data.marketdetails;
      });
    }
  }
})
