
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('misty_preferences').del()
    .then(function () {
      return knex('misty_preferences').insert([
        {
         id: 1,
         user_id: 1,
         preference_name: 'home',
         robot_name: 'jill',
         ip_address: '10.0.10.205',
         port_number: '88',
         time_restriction_start: null,
         time_restriction_end: null

        },
        {
          id: 2,
          user_id: 2,
          preference_name: 'work',
          robot_name: 'jane',
          ip_address: '10.0.10.208',
          port_number: '80',
          time_restriction_start: '14:26:16',
          time_restriction_end: '14:26:16'

        },
        {
          id: 3,
          user_id: 3,
          preference_name: 'den',
          robot_name: 'june',
          ip_address: '10.0.10.210',
          port_number: '90',
          time_restriction_start: '14:26:16',
          time_restriction_end: '14:26:16'
        }
        ]);
      })
    .then(function() {
      return knex.raw(
        "SELECT setval('misty_preferences_id_seq', (SELECT MAX(id) FROM misty_preferences))"
      )
    })
  };
