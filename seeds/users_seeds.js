
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
          password: '$2a$08$9iujs4Z0i1hYNlQt0VxIxObcC9Okr8/rlN52Zh6njrSRjqrxeFkRy',
          isAdmin: true,
          isFarmer: true
        }),
        knex('users').insert({
          id: 2,
          email: 'shelby@ft.com',
          username: 'shelby',
          password: '$2a$08$v.W1tQ9QpI3XikLFv35/veB2Z51LBRwdtjv5qcN71aaO5zVbApkGO',
          isAdmin: true,
          isFarmer: false
        }),
        knex('users').insert({
          id: 3,
          email: 'david@ft.com',
          username: 'david',
          password: '$2a$08$EdVPKhhIAxthV0q79rBRHOOVDpyo8BHY9Gj.l.7RPIWOJs9dk8shm',
          isAdmin: false,
          isFarmer: true
        }),
        knex('users').insert({
          id: 4,
          email: 'annie@appleannie.com',
          username: 'annie',
          password: '$2a$08$6Tx/XvfITg9eYCKDDwNH4.WUwt4Z9GHzhmRvbpjfLoPHHuxSbMUZa',
          isAdmin: false,
          isFarmer: true
        }),
        knex('users').insert({
          id: 5,
          email: 'user@user.com',
          username: 'user',
          password: '$2a$08$KpaTylD36yh7C/aHCk8wP.wiedCU4bhFahryssp6NDolDLKsgF6PW',
          isAdmin: false,
          isFarmer: false
        }),
        knex('users').insert({
          id: 6,
          email: 'notfarmer@notfarmer.com',
          username: 'notfarmer',
          password: '$2a$08$23x8pHUEI3fN7IvFOIqTJuhwH2pWFn3VHIAmk74ogzxkRcsLnnL9i',
          isAdmin: false,
          isFarmer: false
        }),
        knex('users').insert({
          id: 7,
          email: 'munsonfarms@concast.net',
          username: 'munsonfarms',
          password: '$2a$08$yPa1tZ9uiqMpNzbwPvCLcetZ.byO5KrnhWf4YJE8zNN9GfWh2qrP2',
          isAdmin: false,
          isFarmer: true
        })
      ]);
    });
};
