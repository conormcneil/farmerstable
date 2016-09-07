
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_csas').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users_csas').insert({
          id: 1,
          user_id: 5,
          csa_id: 1
        }),
        // temporarily remove this data to test signup for csa feature
        // test is: sign up user_id: 5 for csa_id: 2
        // knex('users_csas').insert({
        //   id: 2,
        //   user_id: 5,
        //   csa_id: 2
        // }),
        knex('users_csas').insert({
          id: 3,
          user_id: 5,
          csa_id: 3
        }),
        knex('users_csas').insert({
          id: 4,
          user_id: 6,
          csa_id: 3
        }),
        knex('users_csas').insert({
          id: 5,
          user_id: 2,
          csa_id: 3
        }),
        knex('users_csas').insert({
          id: 6,
          user_id: 6,
          csa_id: 1
        }),
        knex('users_csas').insert({
          id: 7,
          user_id: 9,
          csa_id: 1
        }),
        knex('users_csas').insert({
          id: 8,
          user_id: 10,
          csa_id: 1
        }),
        knex('users_csas').insert({
          id: 9,
          user_id: 11,
          csa_id: 1
        })
      ]);
    });
};
