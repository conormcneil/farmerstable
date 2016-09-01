
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('csas').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('csas').insert({
          id: 1,
          farm_id: 1,
          csa_name: 'Fall Vegetables',
          products: 'squash, shishito peppers, bell peppers, green onions, pumpkins, tomatoes, eggplant',
          pickup_location: 'Rillito Farmer\'s Market',
          pickup_day: 'Saturday',
          pickup_time_start: '8:00AM',
          pickup_time_end: '12:00AM',
          start_date: '07/23/2016',
          end_date: '09/17/2016'
        }),
        knex('csas').insert({
          id: 2,
          farm_id: 2,
          csa_name: 'Tucson CSA',
          products: 'cheese, bread, peppers, herbs, squash, lettuce, eggplant, eggs, coffee',
          pickup_location: 'Audobon Society - Downtown Tucson',
          pickup_day: 'Wednesday',
          pickup_time_start: '4:00PM',
          pickup_time_end: '7:00PM',
          start_date: '09/10/2016',
          end_date: '10/22/2016'
        }),
        knex('csas').insert({
          id: 3,
          farm_id: 5,
          csa_name: 'Annie\'s Fruit Harvest',
          products: 'gala apples, pink lady apples, peaches, pears, jam',
          pickup_location: 'Apple Annie\'s Orchards',
          pickup_day: 'Saturday',
          pickup_time_start: '8:00AM',
          pickup_time_end: '1:00PM',
          start_date: '07/15/2016',
          end_date: '11/02/2016'
        }),
        knex('csas').insert({
          id: 4,
          farm_id: 6,
          csa_name: 'Munson Seasonal CSA',
          products: 'butternut squash, big pumpkins, sweet corn, peaches, eggplant',
          pickup_location: 'Boulder Farmer\'s Market',
          pickup_day: "Saturday",
          pickup_time_start: '8:00AM',
          pickup_time_end: '1:00PM',
          start_date: '01/01/2016',
          end_date: '12/31/2016'
        })
      ]);
    });
};
