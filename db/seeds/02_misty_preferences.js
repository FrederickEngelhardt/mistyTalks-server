
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('misty_preferences').del()
    .then(function () {
      return knex('misty_preferences').insert([
        {
         id: 1,
         misty_preference_id: 1,
         preference_name: 'home',
         robot_name: 'Jungle Joe',
         auth_numbers_string: '+',
         ip_address: '192.168.1.129',
         port_number: '',
         misty_voice: 'US_MichaelVoice',
         set_emotion_valence: '0.2',
         set_emotion_arousal: '0.2',
         set_emotion_dominance: '-0.2',
         time_restriction_start: '20:00:00',
         time_restriction_end: '6:30:00'
        },
        {
          id: 2,
          misty_preference_id: 2,
          preference_name: 'work',
          robot_name: 'jane',
          auth_numbers_string: '123456770',
          ip_address: '192.168.1.129',
          port_number: '',
          misty_voice: 'US_AllisonVoice',
          set_emotion_valence: '0.2',
          set_emotion_arousal: '0.2',
          set_emotion_dominance: '-0.2',
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
          port_number: '',
          misty_voice: 'ginger',
          set_emotion_valence: '0.2',
          set_emotion_arousal: '0.2',
          set_emotion_dominance: '-0.2',
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
