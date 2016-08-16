
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
          image_url: 'http://nortonfarmkennels.com/temp-site/img/bg-3.jpg',
          address: '590 N Tanque Verde Loop Rd, Tucson, AZ 85748',
          markets: '',
          csa: '',
          products: 'eggs, dried herbs, heirloom tomatoes, cucumbers, asparagus, green beans, bell peppers, sunflowers'
        }),
        knex('farms').insert({
          id: 2,
          csa_id: 2,
          name: 'Northbreeze Meadows',
          image_url: 'http://www.myashevillerealestate.com/images/cms/4/photo-1.jpg',
          address: '2420 N Palo Santo Dr, Tucson, AZ 85745',
          markets: '',
          csa: '',
          products: 'pork, beef, chicken, eggs'
        })
      ]);
    });
};
