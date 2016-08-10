app
  .directive("ftHeader",function() {
    return {
      templateUrl: "partials/header.html"
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
