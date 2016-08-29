var map;
if (localStorage.getItem('lastVisit')) {
  var lastVisit = JSON.parse(localStorage.getItem('lastVisit'));
  // set localStorage expiration to 5 minutes
  // after 5 minutes, app refreshes location
  var expireTime = lastVisit + 300000;
}

function initMap() {
  if (localStorage.mapConditions && Date.now() < expireTime) {
    console.log('map exists');
    var mapConditions = JSON.parse(localStorage.getItem('mapConditions'));
    map = new google.maps.Map(document.getElementById('map'),mapConditions);
    var marker = new google.maps.Marker({
      map: map,
      position: mapConditions.center
    });
  } else {
    console.log('new map');
    var getLocation = new Promise(
      function(resolve,reject) {
        var center;
        navigator.geolocation.getCurrentPosition(function(position) {
          center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var initialConditions = {
            center: center,
            zoom: 12
          };
          resolve(initialConditions);
        });
      });
      // get Location Promise
      getLocation.then(function(data){
        localStorage.setItem("mapConditions",JSON.stringify(data));
        localStorage.setItem("lastVisit",JSON.stringify(Date.now()));
        map = new google.maps.Map(document.getElementById('map'), data);
        var marker = new google.maps.Marker({
          map: map,
          position: data.center
        });
      });
  }
};
