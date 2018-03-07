
exports.up = function(knex, Promise) {
  return knex.schema.createTable('misty_preferences', table => {
    table.increments()
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.string('preference_name').notNullable()
    table.string('robot_name').notNullable()
    table.string('ip_address').notNullable()
    table.integer('port_number').notNullable()
    table.time('time_restriction_start');
    table.time('time_restriction_end');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('misty_preferences')
};

// .defaultTo(knex.raw('now()'))
// required for tests to pass
