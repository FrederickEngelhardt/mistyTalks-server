
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('email').unique().comment('This is the email field');
    table.string('password').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};

// .defaultTo(knex.raw('now()'))
// required for tests to pass
