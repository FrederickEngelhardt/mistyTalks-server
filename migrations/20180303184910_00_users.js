
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('email').unique().comment('This is the email field');
    table.string('password').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};

// .defaultTo(knex.raw('now()'))
// required for tests to pass
