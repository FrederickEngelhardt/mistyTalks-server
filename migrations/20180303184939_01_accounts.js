
exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', table => {
    table.integer('id').unsigned().comment('check this')
    table.foreign('users_id').references('Items.user_id_in_items').comment('check this')

    table.string('misty_voice').unique();
    table.string('set_emotions').notNullable();
    table.integer('time_restriction_start').notNullable();
    table.integer('time_restriction_end').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts')
};

// .defaultTo(knex.raw('now()'))
// required for tests to pass
