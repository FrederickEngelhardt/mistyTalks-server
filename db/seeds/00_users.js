
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          email: 'me@me.com',
          password: 'zxcv',
          misty_voice: 'candi',
          set_emotions: 'unhappiness',
        },
        {
          id: 2,
          email: 'mine@mine.com',
          password: 'vbnm',
          misty_voice: 'cinnamon',
          set_emotions: 'sassy',
        },
        {
          id: 3,
          email: 'my@my.com',
          password: 'fghj',
          misty_voice: 'ginger',
          set_emotions: 'awkward',
        }
      ]);
    });
};
