
exports.up = function(knex, Promise) {
  return knex.schema.createTable('farms_followers', function(table) {
    table.increments();
    table.integer('farm_id');
    table.integer('user_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('farms_followers');
};
