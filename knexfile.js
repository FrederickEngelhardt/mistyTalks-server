// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/mistyTalks_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/mistyTalks_test',
    migrations: {
      directory:'./db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory:'./db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
