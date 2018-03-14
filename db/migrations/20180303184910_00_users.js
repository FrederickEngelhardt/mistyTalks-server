
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.integer('user_id').notNullable();
    table.string('first_name').defaultTo('').notNullable();
    table.string('last_name').defaultTo('').notNullable();
    table.string('email').notNullable().unique().comment('This is the email field');
    table.string('password').notNullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
