
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('farm_posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('farm_posts').insert({
          id: 1,
          farm_id: 1,
          // sent_to: '',
          subject: 'Happy Holidays!',
          body: 'Welcome to the holiday season! Be sure to check out the holiday cheer at the Shady Spring Farms Christmas Tree lot!',
          date: '1473116510594'
        }),
        knex('farm_posts').insert({
          id: 2,
          farm_id: 1,
          // sent_to: '',
          subject: 'Another post',
          body: 'This is another farm post, with more content!',
          date: '1473181510594'
        }),
        knex('farm_posts').insert({
          id: 3,
          farm_id: 1,
          // sent_to: '',
          subject: 'This is the most recent post',
          body: 'I hope these display properly!',
          date: '1473186510594'
        })
      ]);
    });
};
