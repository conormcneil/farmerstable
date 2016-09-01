
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
          isFarmer: true
        }),
        knex('users').insert({
          id: 2,
          email: 'shelby@ft.com',
          username: 'shelby',
          password: 'shelby',
          isAdmin: true,
          isFarmer: false
        }),
        knex('users').insert({
          id: 3,
          email: 'david@ft.com',
          username: 'david',
          password: 'david',
          isAdmin: false,
          isFarmer: true
        }),
        knex('users').insert({
          id: 4,
          email: 'annie@appleannie.com',
          username: 'annie',
          password: 'annie',
          isAdmin: false,
          isFarmer: true
        }),
        knex('users').insert({
          id: 5,
          email: 'user@user.com',
          username: 'user',
          password: 'user',
          isAdmin: false,
          isFarmer: false
        }),
        knex('users').insert({
          id: 6,
          email: 'notfarmer@notfarmer.com',
          username: 'notfarmer',
          password: 'notfarmer',
          isAdmin: false,
          isFarmer: false
        }),
        knex('users').insert({
          id: 7,
          email: 'munsonfarms@concast.net',
          username: 'munsonfarms',
          password: 'munsonfarms',
          isAdmin: false,
          isFarmer: true
        })
      ]);
    });
};
