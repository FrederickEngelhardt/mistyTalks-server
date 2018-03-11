
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Bob',
          last_name: 'Ross',
          email: 'me@me.com',
          password: 'zxcv',
          misty_voice: 'candi',
          set_emotions: 'unhappiness',
        },
        {
          id: 2,
          first_name: 'Jim',
          last_name: 'Smith',
          email: 'mine@mine.com',
          password: 'vbnm',
          misty_voice: 'cinnamon',
          set_emotions: 'sassy',
        },
        {
          id: 3,
          first_name: 'Ron',
          last_name: 'Burgandy',
          email: 'my@my.com',
          password: 'fghj',
          misty_voice: 'ginger',
          set_emotions: 'awkward',
        }
        ]);
      })
    .then(function() {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"
      )
    })
  };
