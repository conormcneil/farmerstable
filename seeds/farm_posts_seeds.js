
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
        }),

        knex('farm_posts').insert({
          id: 4,
          farm_id: 2,
          // sent_to: '',
          subject: 'Welcome to Northbreeze Meadows!',
          body: 'We are so glad to announce our first digital CSA, a seasonal mix of butternut squash, big pumpkins, sweet corn, peaches, and eggplant. It has been a wonderful growing season and we can\'t wait to share it all with you! Make sure to sign up for our CSA soon!',
          date: '1473186310594'
        }),
        knex('farm_posts').insert({
          id: 5,
          farm_id: 2,
          // sent_to: '',
          subject: 'Flat Tire',
          body: 'We will be late to the Rillito Farmer\'s Market this morning- ran over a nail on the highway! We should be arriving around 10 AM. Can\'t wait to see everyone!',
          date: '1473186410594'
        }),
        knex('farm_posts').insert({
          id: 6,
          farm_id: 2,
          // sent_to: '',
          subject: 'Extra strawberries',
          body: 'It\'s the end of strawberry season and we have lots of delicious berries left! Pick up an extra box of berries for $5 this week only!',
          date: '1473186610594'
        }),

        knex('farm_posts').insert({
          id: 7,
          farm_id: 6,
          // sent_to: '',
          subject: 'Welcome to Munson Farms!',
          body: 'We are so glad to announce our first digital CSA, a seasonal mix of butternut squash, big pumpkins, sweet corn, peaches, and eggplant. It has been a wonderful growing season and we can\'t wait to share it all with you! Make sure to sign up for our CSA soon!',
          date: '1473186310594'
        }),
        knex('farm_posts').insert({
          id: 8,
          farm_id: 6,
          // sent_to: '',
          subject: 'A Little Extra Sunshine',
          body: 'Hi everyone! \nWe have been very excited about our new heirloom squash this season but we have some bad news- too much sunshine has withered many of our plants! As sad as this news is, it means we will be selling a few of the most resilient squash for a reduced price this week. \n-Your Farmer',
          date: '1473186410594'
        }),
        knex('farm_posts').insert({
          id: 9,
          farm_id: 6,
          // sent_to: '',
          subject: 'It\'s U-Pick Season!',
          body: 'October brings cool winds, early sunsets, and buckets of delicious fruit! Nothing beats the fun of picking your own fruit with loved ones. Come down 7 days a week 8AM-3PM to get your delicious apples!',
          date: '1473186610594'
        }),
        knex('farm_posts').insert({
          id: 10,
          farm_id: 6,
          // sent_to: '',
          subject: 'Happy Holidays!',
          body: 'Happy Holidays, everyone! Munson Farms will be taking this weekend off so we will not be attending any markets this week. We will resume our regular market schedule on the 1st of next month.',
          date: '1473186610594'
        })
      ]);
    });
};
