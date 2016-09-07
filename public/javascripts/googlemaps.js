if (JSON.parse(localStorage.getItem('coords'))) {
  console.log('coords exist');
  var currentLocation = JSON.parse(localStorage.getItem('coords'));
  console.log(currentLocation);
} else {
  console.log('new coords');
  navigator.geolocation.getCurrentPosition(function(position) {
    var currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log(currentLocation);
    localStorage.setItem('coords',JSON.stringify(currentLocation))
  });
}
// TODO: set expire time (~3-5min) to force coords update
