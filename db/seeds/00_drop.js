exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_misty_preferences')
    .del()
    .then(() => {
      knex('misty_preferences').del()
    })
    .then(() => {
      knex('users').del()
    })
}
