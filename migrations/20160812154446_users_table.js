
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email').unique();
    table.string('username').unique();
    table.string('password');
    table.boolean('isAdmin').defaultTo(false);
    table.boolean('isFarmer');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
