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
  })
  .directive("ftUserNav",function() {
    return {
      templateUrl: "partials/user-nav.html"
    }
  })
  .directive("ftAccountNav",function() {
    return {
      templateUrl: "partials/account/account-nav.html"
    }
  })
  .directive("ftAccountHome",function() {
    return {
      templateUrl: "partials/account/account-home.html"
    }
  })
  .directive("ftAccountCsa",function() {
    return {
      templateUrl: "partials/account/account-csa.html"
    }
  })
  .directive("ftAccountSettings",function() {
    return {
      templateUrl: "partials/account/account-settings.html"
    }
  });
