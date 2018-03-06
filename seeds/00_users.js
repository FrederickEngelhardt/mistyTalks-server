
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          email: 'me@me.com',
          password: 'zxcv'
        },
        { id: 2,
          email: 'mine@mine.com',
          password: 'vbnm'
        },
        {id: 3,
          email: 'my@my.com',
          password: 'fghj'
        }
      ]);
    });
};
