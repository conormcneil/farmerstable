
exports.up = function(knex, Promise) {
  return knex.schema.createTable('csas', function(table) {
    table.increments();
    table.integer('farm_id');
    table.string('csa_name');
    table.string('products');
    table.string('pickup_location');
    table.string('pickup_day');
    table.string('pickup_time_start');
    table.string('pickup_time_end');
    table.date('start_date');
    table.date('end_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('csas');
};
