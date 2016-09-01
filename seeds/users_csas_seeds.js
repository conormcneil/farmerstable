
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
        knex('users_csas').insert({
          id: 2,
          user_id: 5,
          csa_id: 2
        }),
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
        })
      ]);
    });
};
