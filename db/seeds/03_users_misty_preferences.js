
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_misty_preferences')
  .del()
    .then(function () {
      return knex('users_misty_preferences').insert([
        {
         user_id: 1,
         misty_preference_id: 1,
        },
        {
          user_id: 2,
          misty_preference_id: 2,
        },
        {
          user_id: 3,
          misty_preference_id: 3,
        }
        ]);
      })
    }
