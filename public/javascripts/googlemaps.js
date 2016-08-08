var map;
function initMap() {
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
    map = new google.maps.Map(document.getElementById('map'), data);
    var marker = new google.maps.Marker({
      map: map,
      position: data.center
    });
  });
};
