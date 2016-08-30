// var origin = { lat: 32.2540946, lng: -110.8850949 }; // 85712
var origin = { lat: 38.912068, lng: -77.0190228 } // 20001
var data = [
  {distanceFromOrigin: 35.38321773452738},
  {distanceFromOrigin: 34.6455709411615},
  {distanceFromOrigin: 3.3011076747238897},
  {distanceFromOrigin: 40.602084898549364}];
var output = [];
var sort = [];
var max = -1;


function findMax(arr) {
  if (arr.length === 0) {
    return sort;
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]['distanceFromOrigin'] > max) {
      var index = i;
      max = arr[i]['distanceFromOrigin']
      console.log('max',max);
    }
  }
  var splice = arr.splice(index,1);
  sort.unshift(splice[0]);
  return findMax(arr);
}

console.log(findMax(data));
