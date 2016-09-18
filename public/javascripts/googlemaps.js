try {
  if (JSON.parse(localStorage.getItem('coords'))) {
    var currentLocation = JSON.parse(localStorage.coords);
    console.log('coords exist',currentLocation);
  } else {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('new coords',currentLocation);
      localStorage.coords = JSON.stringify(currentLocation);
    });
  }
} catch (e) {
  var currentLocation = {
    lat: 35,
    lng: -110
  }
}
// TODO: set expire time (~3-5min) to force coords update
