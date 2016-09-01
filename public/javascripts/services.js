app
  .factory("MarketService",function($http) {
    return {
      getMarketsByZip: function(zip) {
        var url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zip;
        return $http.get(url);
      },
      getMarketById: function(id) {
        var url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + id;
        return $http.get(url);
      }
    }
  })
  .factory("FormService",function($http) {
    return {
      forms: {
        signin: false, // false
        signup: false, // false
        user_nav: false, // false
        account_home: false, // true
        account_csa: true, // false
        account_settings: false, // false
        zip_search: false // false
      },
      toggle: function(form) {
        if (form === 'account_home' || form === 'account_csa' || form === 'account_settings') {
          this.forms['account_home'] = false;
          this.forms['account_csa'] = false;
          this.forms['account_settings'] = false;
        }
        this.forms[form] = !this.forms[form];
        return this.forms[form];
      }
    }
  })
  .factory("UserService",function($http) {
    return {
      // set active user on signin
      activeUser: {}
    }
  })
  .factory("GoogleMapsService",function($http) {
    return {
      getLatLng: function(address) {
        var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address;
        return $http.get(googleUrl);
      }
    }
  });
