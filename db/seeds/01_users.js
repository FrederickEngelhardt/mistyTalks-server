
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Admin',
          last_name: 'MistyTalks',
          email: 'admin@mistytalks.com',
          password: '$2a$10$uB1nC5RLNVkgQKRwTKxx8eqT4qN4tctGUb9/sF19tbyLjNWL9Ssli'
        },
        {
          id: 2,
          first_name: 'Jim',
          last_name: 'Smith',
          email: 'mine@mine.com',
          password: '$2a$10$9aTaAGPn4lh7SXvQOT6I0.iB1VdrIAiR6ctt/2AjO/1ifEwGy1Ji2'
        },
        {
          id: 3,
          first_name: 'Ron',
          last_name: 'Burgandy',
          email: 'my@my.com',
          password: '$2a$10$uB1nC5RLNVkgQKRwTKxx8eqT4qN4tctGUb9/sF19tbyLjNWL9Ssli'
        }
        ]);
      })
    .then(function() {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"
      )
    })
  };
