var center = {};

if ("geolocation" in navigator) {
  /* geolocation is available, center Google Map */
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  });
} else {
  /* geolocation IS NOT available, set to default */
  console.log('no go! retreat!');
  center = {
    lat: 39.922,
    lng: -104.927
  };
};

var initialConditions = {
  center: {lat: 39.922, lng: -104.927},
  zoom: 15
};
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), initialConditions);
  var marker = new google.maps.Marker({
    map: map,
    position: initialConditions.center,
    title: 'Hello World!'
  });
};
