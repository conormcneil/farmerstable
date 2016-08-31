
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('farms_followers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('farms_followers').insert({id: 1,
          id: 1,
          farm_id: 1,
          user_id: 5
        }),
        knex('farms_followers').insert({id: 2,
          id: 2,
          farm_id: 1,
          user_id: 2
        }),
        knex('farms_followers').insert({id: 3,
          id: 3,
          farm_id: 2,
          user_id: 5
        }),
        knex('farms_followers').insert({id: 1,
          id: 4,
          farm_id: 2,
          user_id: 2
        }),
        knex('farms_followers').insert({id: 2,
          id: 5,
          farm_id: 4,
          user_id: 6
        }),
        knex('farms_followers').insert({id: 3,
          id: 6,
          farm_id: 5,
          user_id: 5
        }),
        knex('farms_followers').insert({id: 1,
          id: 7,
          farm_id: 5,
          user_id: 6
        }),
        knex('farms_followers').insert({id: 2,
          id: 8,
          farm_id: 5,
          user_id: 2
        })
      ]);
    });
};
