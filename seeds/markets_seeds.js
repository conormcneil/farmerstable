
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markets').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('markets').insert({
          id: 1,
          name: 'Market One',
          address: '1 Main St'
      }),
        knex('markets').insert({
          id: 2,
          name: 'Market Two',
          address: '2 Main St'
      }),
        knex('markets').insert({
          id: 3,
          name: 'Market Three',
          address: '3 Main St'
      })
      ]);
    });
};
