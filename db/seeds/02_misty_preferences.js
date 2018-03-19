
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('misty_preferences').del()
    .then(function () {
      return knex('misty_preferences').insert([
        {
         id: 1,
         misty_user_preference_id: 2,
         preference_name: 'home',
         robot_name: 'Jungle Joe',
         auth_numbers_string: '+15038063822',
         ip_address: '192.168.1.129',
         port_number: null,
         misty_voice_name: 'US_MichaelVoice',
         misty_face_name: null,
         set_emotion_valence: 0.2,
         set_emotion_arousal: 0.2,
         set_emotion_dominance: -0.2,
         time_restriction_start: '20:00:00',
         time_restriction_end: '6:30:00'
        },
        {
          id: 2,
          misty_user_preference_id: 1,
          preference_name: 'work',
          robot_name: 'jane',
          auth_numbers_string: '123456770',
          ip_address: '192.168.1.129',
          port_number: null,
          misty_voice_name: 'US_AllisonVoice',
          misty_face_name: "Concerned Eyes",
          set_emotion_valence: 0,
          set_emotion_arousal: 1,
          set_emotion_dominance: 0,
          time_restriction_start: '14:26:16',
          time_restriction_end: '14:26:16'
        },
        {
          id: 3,
          misty_user_preference_id: 1,
          preference_name: 'den',
          robot_name: 'june',
          auth_numbers_string: '123456700',
          ip_address: '10.0.10.210',
          port_number: null,
          misty_voice_name: 'en-GB_KateVoice',
          misty_face_name: "Concerned Eyes",
          set_emotion_valence: 0,
          set_emotion_arousal: 1,
          set_emotion_dominance: 0,
          time_restriction_start: '14:26:16',
          time_restriction_end: '14:26:16'
        }
        {
          id: 4,
          misty_user_preference_id: 2,
          preference_name: 'den',
          robot_name: 'june',
          auth_numbers_string: '123456700',
          ip_address: '10.0.10.210',
          port_number: null,
          misty_voice_name: 'de-DE_BirgitVoice',
          misty_face_name: "Concerned Eyes",
          set_emotion_valence: 0,
          set_emotion_arousal: 1,
          set_emotion_dominance: 0,
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
