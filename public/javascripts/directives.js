app
  .directive("ftHeader",function() {
    return {
      templateUrl: "partials/header.html"
      // controller: 'HeaderController'
    }
  })
  .directive("ftMarketList",function() {
    return {
      templateUrl: "partials/market-list.html"
    }
  })
  .directive("ftMarketDetails",function() {
    return {
      templateUrl: "partials/market-details.html"
    }
  });
