exports.up = function (knex) {
  return knex.schema.createTable('search', function (table) {
    table.increments('id').primary().unsigned();
    table.string('videoId');
    table.text('title').notNullable();
    table.text('description');
    table.string('thumbnailUrl');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('search');
};
