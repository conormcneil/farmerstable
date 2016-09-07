if (JSON.parse(localStorage.getItem('coords'))) {
  var currentLocation = JSON.parse(localStorage.getItem('coords'));
  console.log('coords exist',currentLocation);
} else {
  navigator.geolocation.getCurrentPosition(function(position) {
    var currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log('new coords',currentLocation);
    localStorage.setItem('coords',JSON.stringify(currentLocation))
  });
}
// TODO: set expire time (~3-5min) to force coords update
