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
          name: 'Shady Springs Farms, LLC',
          image_url: 'http://nortonfarmkennels.com/temp-site/img/bg-3.jpg',
          address: '590 N Tanque Verde Loop Rd, Tucson, AZ  85748',
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
          products: ['eggs','dried herbs','heirloom tomatoes','cucumbers','asparagus','green beans','bell peppers','sunflowers']
        },
        {
          id: 2,
          name: 'Northbreeze Meadows',
          address: '1234 E 5th St, Tucson, AZ 85712',
          markets: [
            {
              id: 1010543,
              name: 'Heirloom Rillito Park Farmers Market'
            }
          ],
          products: ['pork','beef','chicken','eggs']
        }
      ]
    }
  });
