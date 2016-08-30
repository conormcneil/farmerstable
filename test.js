// var origin = { lat: 32.2540946, lng: -110.8850949 }; // 85712
var origin = { lat: 38.912068, lng: -77.0190228 } // 20001
var data = [  {
    id: 1,
    csa_id: 1,
    name: 'Shady Spring Farms',
    owner_id: 1,
    image_url: 'http://nortonfarmkennels.com/temp-site/img/bg-3.jpg',
    address: '590 N Tanque Verde Loop Rd, Tucson, AZ 85748',
    lat: '33.4009387',
    lng: '-111.9704112',
    contact_phone: '520-555-6789',
    contact_email: 'conor@shadyspringfarms.com',
    markets: null,
    csa: null,
    products: 'eggs, dried herbs, heirloom tomatoes, cucumbers, asparagus, green beans, bell peppers, sunflowers' },
   {
    id: 2,
    csa_id: 2,
    name: 'Northbreeze Meadows',
    owner_id: 2,
    image_url: 'http://www.myashevillerealestate.com/images/cms/4/photo-1.jpg',
    address: '2420 N Palo Santo Dr, Tucson, AZ 85745',
    lat: '32.253603',
    lng: '-111.018735',
    contact_phone: '520-555-9876',
    contact_email: 'shelby@nbmfarm.com',
    markets: null,
    csa: null,
    products: 'pork, beef, chicken, eggs' },
   {
    id: 4,
    csa_id: null,
    name: 'Pittsburgh County Farms',
    owner_id: 1,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Pittsburgh_zoo_ppgaquarium.jpg',
    address: '7340 Butler St, Pittsburgh, PA 15206',
    lat: '40.487607',
    lng: '-79.9198828',
    contact_phone: '520-555-PITT',
    contact_email: 'conor@ft.com',
    markets: null,
    csa: null,
    products: null },
   {
    id: 3,
    csa_id: 3,
    name: 'San Diego Zoo Regional Farm',
    owner_id: 1,
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/San_Diego_Zoo_entrance_elephant.jpg',
    address: '2920 Zoo Dr, San Diego, CA 92101',
    lat: '32.7337409',
    lng: '-117.1482836',
    contact_phone: '520-555-4312',
    contact_email: 'conor@ft.com',
    markets: null,
    csa: null,
    products: null } ];

// console.log(data);

function sortFarms(data) {
  // console.log(data);
  var output = [];
  for (var i = 0; i < data.length; i++) {
    // add each farm to output array
    output.push(data[i]);
    // calculate distance from origin
    var distanceFromOrigin = Math.sqrt(Math.pow((data[i].lng - origin.lng),2) + Math.pow((data[i].lat - origin.lat),2));
    console.log(distanceFromOrigin);
    console.log(typeof distanceFromOrigin);
    // attach to output arary
    data[i]['distanceFromOrigin'] = distanceFromOrigin;
  };
  // sort output object into sorted array to respond to request
  var sortedArray = [];

  // sort happening here
  for (var i = 0; i < output.length; i++) {
    console.log(i);
    if (sortedArray.length === 0) {
      sortedArray.push(output.splice(i,1));
    } else { // else if sortedArray.length > 0: compare and insert
      for (var j = 0; j < sortedArray.length; j++) {
        if (output[i]['distanceFromOrigin'] < sortedArray[j]['distanceFromOrigin']) {
          sortedArray.splice(j,0,output.splice(i,1));
        }
      }
    }
  }
  console.log('sorted',sortedArray);

  // return sorted array


  // for (var i = 0; i < keys.length; i++) {
  //   console.log('i',i);
  //   if (sortedArray.length === 0) {
  //     sortedArray.push(output[keys[i]]);
  //     // console.log("FIRST PUSH",sortedArray);
  //   } else {
  //     for (var j = 0; j < sortedArray.length-1; j++) {
  //       console.log('j',j,'i',i,sortedArray.length);
  //       if (output[keys[i]].distanceFromOrigin < sortedArray[j].distanceFromOrigin) {
  //         // insert object at this point in the array
  //         sortedArray.splice(j, 0, output[keys[i]]);
  //         // console.log('INSERT',sortedArray);
  //         // j++;
  //       }
  //     }
  //     sortedArray.push(output[keys[i]]);
  //     // console.log('PUSH TO END',sortedArray);
  //     console.log('i',i);
  //   }
  // }
  // always return <10 results
  if (sortedArray.length > 10) {
    sortedArray.splice(10,sortedArray.length);
  };
  // console.log(sortedArray);
  // res.json(sortedArray);
  // return sortedArray;
}
console.log(sortFarms(data)); // [4,2,1,3] butOut => [4,2,4,1,4,2,4,3,4]
