
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('first_name').defaultTo('');
    table.string('last_name').defaultTo('');
    table.string('email').unique().comment('This is the email field');
    table.string('password').notNullable();
    table.string('misty_voice').unique();
    table.string('set_emotions');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
