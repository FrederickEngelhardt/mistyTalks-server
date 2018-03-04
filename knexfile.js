// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/users'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/users'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
