app
  .directive("ftHeader",function() {
    return {
      templateUrl: "partials/header.html"
    }
  })
  .directive("ftCurtain",function() {
    return {
      templateUrl: "partials/curtain.html"
    }
  })
  .directive("ftMarketList",function() {
    return {
      templateUrl: "partials/markets/market-list.html"
    }
  })
  .directive("ftMarketDetails",function() {
    return {
      templateUrl: "partials/markets/market-details.html"
    }
  })
  .directive("ftUserNav",function() {
    return {
      templateUrl: "partials/user-nav.html"
    }
  })
  .directive("ftAccountNav",function() {
    return {
      templateUrl: "partials/accounts/account-nav.html"
    }
  })
  .directive("ftAccountHome",function() {
    return {
      templateUrl: "partials/accounts/account-home.html"
    }
  })
  .directive("ftAccountCsa",function() {
    return {
      templateUrl: "partials/accounts/account-csa.html"
    }
  })
  .directive("ftAccountSettings",function() {
    return {
      templateUrl: "partials/accounts/account-settings.html"
    }
  });
