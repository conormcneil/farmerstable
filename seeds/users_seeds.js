
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          email: 'conor@ft.com',
          username: 'conor',
          password: 'conor',
          isAdmin: true,
          isFarmer: true,
        }),
        knex('users').insert({
          id: 2,
          email: 'shelby@ft.com',
          username: 'shelby',
          password: 'shelby',
          isAdmin: true,
          isFarmer: false,
        }),
        knex('users').insert({
          id: 3,
          email: 'david@ft.com',
          username: 'david',
          password: 'david',
          isAdmin: false,
          isFarmer: true,
        })
      ]);
    });
};
