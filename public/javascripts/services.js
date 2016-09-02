app
  .factory("FormService",function($http) {
    return {
      forms: {
        signin: false, // false
        signup: false, // false
        user_nav: false, // false
        // TODO
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
      // share active user between controllers
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
