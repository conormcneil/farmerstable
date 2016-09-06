
exports.up = function(knex, Promise) {
  return knex.schema.createTable('farm_posts', function(table) {
    table.increments();
    table.integer('farm_id');
    table.string('sent_to');
    table.string('subject');
    table.text('body','longtext');
    table.string('date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('farm_posts');
};
