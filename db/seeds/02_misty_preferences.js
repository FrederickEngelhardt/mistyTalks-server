
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('misty_preferences').del()
    .then(function () {
      return knex('misty_preferences').insert([
        {
         id: 1,
         misty_user_preference_id: 1,
         preference_name: 'home',
         robot_name: 'Jungle Joe',
         auth_numbers_string: '+15038063822',
         misty_twilio_number: '+19718035516',
         ip_address: '192.168.1.129',
         port_number: null,
         misty_voice_name: 'en-US_AllisonVoice',
         misty_face_name: null,
         set_emotion_valence: 0.2,
         set_emotion_arousal: 0.2,
         set_emotion_dominance: -0.2,
         time_restriction_start: null,
         time_restriction_end: null
        },
        {
          id: 2,
          misty_user_preference_id: 2,
          preference_name: 'Work',
          robot_name: 'Jane',
          auth_numbers_string: '123456770',
          misty_twilio_number: null,
          ip_address: '192.168.1.129',
          port_number: null,
          misty_voice_name: 'en-US_AllisonVoice',
          misty_face_name: "Concerned Eyes",
          set_emotion_valence: 0,
          set_emotion_arousal: 1,
          set_emotion_dominance: 0,
          time_restriction_start: null,
          time_restriction_end: null
        },
        {
          id: 3,
          misty_user_preference_id: 3,
          preference_name: 'Den',
          robot_name: 'June',
          auth_numbers_string: '123456700',
          misty_twilio_number: null,
          ip_address: '10.0.10.210',
          port_number: null,
          misty_voice_name: 'en-GB_KateVoice',
          misty_face_name: "Concerned Eyes",
          set_emotion_valence: 0,
          set_emotion_arousal: 1,
          set_emotion_dominance: 0,
          time_restriction_start: null,
          time_restriction_end: null
        }
        ]);
      })
    .then(function() {
      return knex.raw(
        "SELECT setval('misty_preferences_id_seq', (SELECT MAX(id) FROM misty_preferences))"
      )
    })
  };
