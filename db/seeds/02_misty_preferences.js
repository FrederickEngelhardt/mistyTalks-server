
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('misty_preferences').del()
    .then(function () {
      return knex('misty_preferences').insert([
        {
         id: 1,
         misty_preference_id: 1,
         preference_name: 'home',
         robot_name: 'jill',
         auth_numbers_string: '123456769',
         ip_address: '10.0.10.205',
         port_number: 88,
         misty_voice: 'candi',
         set_emotion: 'unhappiness',
         time_restriction_start: '14:26:16',
         time_restriction_end: '14:26:16'

        },
        {
          id: 2,
          misty_preference_id: 2,
          preference_name: 'work',
          robot_name: 'jane',
          auth_numbers_string: '123456770',
          ip_address: '10.0.10.208',
          port_number: 80,
          misty_voice: 'cinnamon',
          set_emotion: 'sassy',
          time_restriction_start: '14:26:16',
          time_restriction_end: '14:26:16'

        },
        {
          id: 3,
          misty_preference_id: 3,
          preference_name: 'den',
          robot_name: 'june',
          auth_numbers_string: '123456700',
          ip_address: '10.0.10.210',
          port_number: 90,
          misty_voice: 'ginger',
          set_emotion: 'awkward',
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
