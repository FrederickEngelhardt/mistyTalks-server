
exports.up = function(knex, Promise) {
  return knex.schema.createTable('misty_preferences', table => {
    table.increments()
    table.integer('misty_preference_id')
    table.foreign('user_id').references('misty_preference_id')
    table.string('preference_name').notNullable()
    table.string('robot_name').notNullable()
    table.string('auth_numbers_string').notNullable()
    table.string('ip_address').notNullable()
    table.integer('port_number').notNullable()
    table.string('misty_voice').notNullable();
    table.string('set_emotion_valence').notNullable();
    table.string('set_emotion_arousal').notNullable();
    table.string('set_emotion_dominance').notNullable();
    table.time('time_restriction_start');
    table.time('time_restriction_end');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('misty_preferences')
};
