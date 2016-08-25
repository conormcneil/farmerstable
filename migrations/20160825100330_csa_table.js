
exports.up = function(knex, Promise) {
  return knex.schema.createTable('csa', function(table) {
    table.increments();
    table.integer('farm_id');
    table.string('csa_name');
    table.string('products');
    table.string('pickup_location');
    table.string('pickupp_day');
    table.time('pickup_time_start');
    table.time('pickup_time_end');
    table.date('start_date');
    table.date('end_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('csa');
};
