
exports.up = function(knex, Promise) {
  return knex.schema.createTable('farms', function(table) {
    table.increments();
    table.integer('csa_id');
    table.string('name');
    table.integer('owner_id');
    table.string('image_url');
    table.string('address');
    table.string('markets');
    table.string('csa');
    table.string('products');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('farms');
};
