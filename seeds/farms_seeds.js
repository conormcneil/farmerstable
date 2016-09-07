
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
          image_url: 'http://www.schwabinsagency.com/img/~www.schwabinsagency.com/farm%20pic.jpg',
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
          owner_id: 3,
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
          owner_id: null,
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
        }),
        knex('farms').insert({
          id: 7,
          csa_id: null,
          name: 'McReilly Farms',
          owner_id: 8,
          image_url: 'http://www.mcreillyfarms.com/uploads/1/1/9/3/11937539/2372083.jpg?1335495038',
          contact_phone: '303-591-4529',
          contact_email: 'Info@McReillyFarms.com',
          address: '5875 Monarch Rd, Longmont, CO 80503',
          lat: '40.0978319',
          lng: '-105.217053'
        }),
        knex('farms').insert({
          id: 8,
          csa_id: null,
          name: 'Red Wagon Farm',
          owner_id: 9,
          image_url: 'https://redwagoncsa.files.wordpress.com/2013/01/farmstandlaf1.jpg?w=540&h=396',
          contact_phone: '303-555-9876',
          contact_email: 'info@redwagonfarmboulder.com',
          address: '7694 North 63rd Street Longmont, CO 80503',
          lat: '40.1147551',
          lng: '-105.2063716'
        }),
        knex('farms').insert({
          id: 9,
          csa_id: null,
          name: 'Sprout City Farms',
          owner_id: 10,
          image_url: 'http://static1.squarespace.com/static/5351f2d7e4b0e65f5c1f6f81/535ae85de4b098b4209f8432/535ae85ee4b009fc847cfb6f/1398466654858/4667a26b68ff66f196b6a8989e69cc8a.jpg',
          contact_phone: '720-319-8126',
          contact_email: 'meg@sproutcityfarms.org',
          address: '6700 E. Virginia Ave, SE Denver 80224',
          lat: '39.7067576',
          lng: '-104.9090752'
        }),
        knex('farms').insert({
          id: 10,
          csa_id: null,
          name: 'KYV Farm',
          owner_id: 11,
          image_url: 'http://augustine.com/sites/default/files/articles/kyv_farms_produce_5x3.jpg',
          contact_phone: '787-232-2234',
          contact_email: 'info@kyvfarm.com',
          address: '7086 County Road 16A, St Augustine, FL 32092',
          lat: '29.9799231',
          lng: '-81.553466'
        }),
        knex('farms').insert({
          id: 11,
          csa_id: null,
          name: 'Jessica\'s Organic Farm',
          owner_id: 12,
          image_url: 'http://www.jessicasorganicfarm.com/images/jessicas/photos/1%20_%20feature%20_%20coleman.jpg',
          contact_phone: '941-358-3895',
          contact_email: 'info@jessicasorganicfarm.com',
          address: '4180 47th St, Sarasota, FL 34235',
          lat: '27.373268',
          lng: '-82.4854759'
        }),
        knex('farms').insert({
          id: 12,
          csa_id: null,
          name: 'Harvest Farm',
          owner_id: 13,
          image_url: 'https://www.harvestfarm.net/image/pfslides/PIzza-Farm-us_CC.jpg',
          contact_phone: '970-286-5832',
          contact_email: 'KBallantyne@DenRescue.org',
          address: '953 Coho Run, Fort Collins, CO 80524',
          lat: '40.5981965',
          lng: '-104.9813514'
        })
      ]);
    });
};
