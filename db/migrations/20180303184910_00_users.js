
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('email').unique().comment('This is the email field');
    table.string('password').notNullable()
    table.string('misty_voice').unique();
    table.string('set_emotions').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};

// .defaultTo(knex.raw('now()'))
// required for tests to pass
