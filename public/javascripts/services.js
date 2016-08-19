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
      },
      markets: [
        {
          id: 1010544,
          name: 'Heirloom Farmers Market at Trail Dust Town',
          address: "6541 E. Tanque Verde Rd., Tucson, Arizona, 85710",
          GoogleLink: "http://maps.google.com/?q=32.2471520%2C%20-110.8531560%20(%22Heirloom+Farmers+Market+at+Trail+Dust+Town%22)",
          products: "Baked goods; Cheese and/or dairy products; Cut flowers; Eggs; Fish and/or seafood; Fresh fruit and vegetables; Fresh and/or dried herbs; Honey; Canned or preserved fruits, vegetables, jams, jellies, preserves, salsas, pickles, dried fruit, etc.; Meat; Nuts; Plants in containers; Poultry; Prepared foods (for immediate consumption); Soap and/or body care products; Trees, shrubs",
          schedule: {
            '01/01/2016 to 12/31/2016': {
              Friday: '9:00 AM-1:00 PM'
            }
          }
        },
        {
          id: 1008718,
          name: 'Rincon Valley Farmers Market',
          address: "12500 E. Old Spanish Trail, Tucson, Arizona, 85747",
          GoogleLink: "http://maps.google.com/?q=32.1278330%2C%20-110.7235950%20(%22Rincon+Valley+Farmers+Market%22)",
          products: "Baked goods; Crafts and/or woodworking items; Eggs; Fresh fruit and vegetables; Fresh and/or dried herbs; Honey; Canned or preserved fruits, vegetables, jams, jellies, preserves, salsas, pickles, dried fruit, etc.; Meat; Plants in containers; Poultry; Prepared foods (for immediate consumption); Soap and/or body care products; Trees, shrubs",
          schedule: {
            '01/01/2016 to 12/31/2016': {
              Saturday: '8:00 AM-1:00 PM'
            }
          }
        },
        {
          id: 1010543,
          name: 'Heirloom Rillito Park Farmers Market',
          address: "4502 N. 1st Ave., Tucson , Arizona, 85718",
          GoogleLink: "http://maps.google.com/?q=32.288679%2C%20-110.953721%20(%22Heirloom+Rillito+Park+Farmers+Market%22)",
          products: "Baked goods; Cheese and/or dairy products; Cut flowers; Eggs; Fish and/or seafood; Fresh fruit and vegetables; Fresh and/or dried herbs; Honey; Canned or preserved fruits, vegetables, jams, jellies, preserves, salsas, pickles, dried fruit, etc.; Meat; Nuts; Plants in containers; Poultry; Prepared foods (for immediate consumption); Soap and/or body care products; Trees, shrubs; Wine, beer, hard cider",
          schedule: {
            '10/01/2016 to 03/31/2017': {
              Saturday: '8:00 AM-12:00 PM',
              Sunday: '9:00 AM-1:00 PM'
            }
          }
        },
      ]
    }
  })
  .factory("FormService",function($http) {
    return {
      forms: {
        signin: false
      },
      toggle: function(form) {
        this.forms[form] = !this.forms[form];
        return this.forms[form];
      }
    }
  })
  .factory("FarmService",function() {
    return {
      farms: [
        {
          id: 1,
          csa_id: 1,
          name: 'Shady Spring Farms, LLC',
          image_url: 'http://nortonfarmkennels.com/temp-site/img/bg-3.jpg',
          address: '590 N Tanque Verde Loop Rd, Tucson, AZ 85748',
          phone: '520-555-6789',
          markets: [
            {
              id: 1010544,
              name: 'Heirloom Farmers Market at Trail Dust Town'
            },
            {
              id: 1008718,
              name: 'Rincon Valley Farmers Market'
            }
          ],
          csa: [
            {
              name: "Fall Vegetables",
              produce: ['cucumbers','cilantro','heirloom pumpkins','green onions','butternut squash','shishito peppers'],
              details: 'Our Fall Vegetables CSA is 6-weeks long and can be picked up Mondays OR Wednesdays from 4:00PM-7:00PM at the McNulty Recreation Center.'
            }
          ],
          products: ['eggs','dried herbs','heirloom tomatoes','cucumbers','asparagus','green beans','bell peppers','sunflowers']
        },
        {
          id: 2,
          csa_id: 2,
          name: 'Northbreeze Meadows',
          image_url: "http://www.myashevillerealestate.com/images/cms/4/photo-1.jpg",
          phone: '520-555-9876',
          address: '2420 N Palo Santo Dr, Tucson, AZ 85745',
          markets: [
            {
              id: 1010543,
              name: 'Heirloom Rillito Park Farmers Market'
            }
          ],
          csa: ['Summer Vegetables'],
          products: ['pork','beef','chicken','eggs']
        }
      ],
      getFarm: function(id) {
        return this.farms.filter(function(e) {
          return e.id === parseInt(id);
        })
      }
    }
  })
  .factory("UserService",function() {
    return {
      users: [
        {
          id: 1,
          name: 'Conor Kingston',
          location: 'Tucson, AZ 85712',
          farms: [{
            id: 1,
            name: 'Shady Springs Farms, LLC'
          },
          {
            id: 2,
            name: 'Northbreeze Meadows'
          }]
        }
      ]
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
