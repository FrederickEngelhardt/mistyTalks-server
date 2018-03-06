
exports.up = function(knex, Promise) {
  return knex.schema.createTable('misty_preferences', table => {

    table.integer('id').unsigned().comment('check this')
    table.foreign('users_id').references('Items.user_id_in_items').comment('check this')

    table.string('preference_name').notNullable()
    table.string('robot_name').notNullable()
    table.string('ip_address').notNullable()
    table.int('port_number').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('misty_preferences')
};

// .defaultTo(knex.raw('now()'))
// required for tests to pass
