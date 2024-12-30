exports.up = function (knex) {
  return knex.schema.createTable('history', function (table) {
    table.increments('id').primary().unsigned();
    table.text('query').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('history');
};
