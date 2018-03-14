
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_misty_preferences', table => {
    table.increments()
    table.integer('user_id').notNullable()
    table.integer('misty_preference_id').notNullable()
    table.foreign('user_id')
    .references('misty_preference_id')
    // .onDelete('CASCADE');
    table.foreign('misty_preference_id')
    .references('user_id')
    // .onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_misty_preferences')
};
