
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_csas', function(table) {
    table.increments();
    table.integer('user_id');
    table.integer('csa_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_csas');
};
