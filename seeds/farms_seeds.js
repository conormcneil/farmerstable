
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('farms').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('farms').insert({
          id: 1,
          csa_id: 1,
          name: 'Shady Spring Farms',
          owner_id: 1,
          image_url: 'http://nortonfarmkennels.com/temp-site/img/bg-3.jpg',
          contact_phone: '520-555-6789',
          contact_email: 'conor@shadyspringfarms.com',
          address: '590 N Tanque Verde Loop Rd, Tucson, AZ 85748',
          lat: '32.22867',
          lng: '-110.754803',
          products: 'eggs, dried herbs, heirloom tomatoes, cucumbers, asparagus, green beans, bell peppers, sunflowers'
        }),
        knex('farms').insert({
          id: 2,
          csa_id: 2,
          name: 'Northbreeze Meadows',
          owner_id: 2,
          image_url: 'http://www.myashevillerealestate.com/images/cms/4/photo-1.jpg',
          contact_phone: '520-555-9876',
          contact_email: 'shelby@nbmfarm.com',
          address: '2420 N Palo Santo Dr, Tucson, AZ 85745',
          lat: '32.252254',
          lng: '-111.017386',
          products: 'pork, beef, chicken, eggs'
        }),
        knex('farms').insert({
          id: 3,
          csa_id: 3,
          name: 'San Diego Zoo Regional Farm',
          owner_id: 1,
          image_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/San_Diego_Zoo_entrance_elephant.jpg',
          contact_phone: '520-555-4312',
          contact_email: 'conor@ft.com',
          address: '2920 Zoo Dr, San Diego, CA 92101',
          lat: '32.7337409',
          lng: '-117.1482836'
        }),
        knex('farms').insert({
          id: 4,
          csa_id: null,
          name: 'Pittsburgh County Farms',
          owner_id: 1,
          image_url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Pittsburgh_zoo_ppgaquarium.jpg',
          contact_phone: '520-555-PITT',
          contact_email: 'conor@ft.com',
          address: '7340 Butler St, Pittsburgh, PA 15206',
          lat: '40.487607',
          lng: '-79.9198828'
        }),
        knex('farms').insert({
          id: 5,
          csa_id: 3,
          name: "Apple Annie's",
          owner_id: 4,
          image_url: 'http://www.appleannies.com/-Images/-Orchards/OrchardEntrance.jpg',
          contact_phone: '520-384-4685',
          contact_email: 'appleanniesfarm@yahoo.com',
          address: '6405 W Williams Rd Willcox, AZ 85643',
          lat: '32.3837487',
          lng: '-109.9309802'
        }),
        knex('farms').insert({
          id: 6,
          csa_id: 4,
          name: 'Munson Farms',
          owner_id: 7,
          image_url: 'http://theteacupincident.typepad.com/.a/6a0134829002b6970c0134864ebbc9970c-600wi',
          contact_phone: '415-298-1500',
          contact_email: 'munsonfarms@comcast.net',
          address: '7355 Valmont Rd, Boulder, CO 80301',
          lat: '40.034011',
          lng: '-105.18034'
        })
      ]);
    });
};
