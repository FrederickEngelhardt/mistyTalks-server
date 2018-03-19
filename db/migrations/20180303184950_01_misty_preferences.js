
exports.up = function(knex, Promise) {
  return knex.schema.createTable('misty_preferences', table => {
    table.increments()
    table.integer('misty_user_preference_id')
    table.foreign('misty_user_preference_id').references('users.id')
    table.string('preference_name').notNullable()
    table.string('robot_name').defaultsTo(null)
    table.string('auth_numbers_string').notNullable()
    table.string('ip_address').notNullable()
    table.integer('port_number').defaultTo(null)
    table.string('misty_voice_name').defaultsTo(null);
    table.string('misty_face_name').defaultsTo(null);
    table.integer('set_emotion_valence').defaultsTo(null);
    table.integer('set_emotion_arousal').defaultsTo(null);
    table.integer('set_emotion_dominance').defaultsTo(null);
    table.time('time_restriction_start').defaultsTo(null);
    table.time('time_restriction_end').defaultsTo(null);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('misty_preferences')
};
