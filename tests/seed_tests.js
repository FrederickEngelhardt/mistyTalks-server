const fs = require('fs')
const path = require('path')
const mocha = require('mocha')
const chai = require('chai')
const knex = require('../knex')
const expect = chai.expect;

// *** DROP SEEDS TEST ***
describe('Drop Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '../db/migrations')
      },
      seeds: {
        directory: path.join(__dirname, '../db/seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('Drops all the data before re-creating it', () => {
    return Promise.all([
      knex('users'),
      knex('misty_preferences')
    ])
      .then(
        (
          [users, misty_preferences]
        ) => {
          return knex.seed.run(this.config.seeds).then(() => {
            return Promise.all([
              knex('users'),
              knex('misty_preferences')
            ]).then(
              (
                [
                  usersNew,
                  misty_preferencesNew
                ]
              ) => {
                expect(users.length).to.equal(usersNew.length)
                expect(misty_preferences.length).to.equal(misty_preferences.length)
              }
            )
          })
        }
      )
      .catch(err => Promise.reject(err))
  })
})

// *** USERS SEEDS TEST ***
describe('Users Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '../db/migrations')
      },
      seeds: {
        directory: path.join(__dirname, '../db/seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one new user', () => {
    return knex('users')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)
        const [user] = actual
        expect(user.user_id).to.be.ok
        expect(user.first_name).to.be.ok
        expect(user.last_name).to.be.ok
        expect(user.email).to.be.ok
        expect(user.password).to.be.ok

      })
      .catch(err => Promise.reject(err))
  })
})

// *** USERS-MISTY_PREFERENCES SEEDS TESTS ***
describe('Users-Misty_Preferences Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '../db/migrations')
      },
      seeds: {
        directory: path.join(__dirname, '../db/seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one join', () => {
    return knex('users_misty_preferences')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)

        const [row] = actual
        expect(row.user_id).to.be.ok
        expect(row.misty_preference_id).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })

  it('is associated with an existing user', () => {
    return knex('users_misty_preferences')
      .then(actual => {
        const [row] = actual
        return knex('users')
          .where({ user_id: row.user_id })
          .first()
      })
      .then(user => {
        expect(user).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })

  it('is associated with an existing misty_preference', () => {
    return knex('users_misty_preferences')
      .then(actual => {
        const [row] = actual
        return knex('misty_preferences')
          .where({ misty_preference_id: row.misty_preference_id })
          .first()
      })
      .then(misty_preference => {
        expect(misty_preference).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })
})

// *** MISTY_PREFERENCES SEEDS TEST ***
describe('Misty_Preference Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '../db/migrations')
      },
      seeds: {
        directory: path.join(__dirname, '../db/seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one new misty_preference', () => {
    return knex('misty_preferences')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)
        const [misty_preference] = actual
        expect(misty_preference.misty_preference_id).to.be.ok
        expect(misty_preference.preference_name).to.be.ok
        expect(misty_preference.robot_name).to.be.ok
        expect(misty_preference.auth_numbers_string).to.be.ok
        expect(misty_preference.ip_address).to.be.ok
        expect(misty_preference.port_number).to.be.ok
        expect(misty_preference.misty_voice).to.be.ok
        expect(misty_preference.set_emotion).to.be.ok
        expect(misty_preference.time_restriction_start).to.be.ok
        expect(misty_preference.time_restriction_end).to.be.ok
        })
      .catch(err => Promise.reject(err))
  })

  it('resets the sequence max id each time', () => {
    return knex('misty_preferences')
      .insert({ misty_preference_id: 4, preference_name: 'test pref', robot_name: 'Judy', auth_numbers_string: '123456789',
      ip_address: '10.1.01.220', port_number: 880, misty_voice: 'Jenna', set_emotion: 'lethargic', time_restriction_start: '11:26:16', time_restriction_end: '11:26:17'
      }, '*')
      .then(([{ misty_preference_id }]) => {
        return knex('misty_preferences').then(misty_preferences => {
          const err = `Check that you've reset the auto-incrementing ID`
          expect(misty_preference_id, err).to.equal(misty_preferences.length)
        })
      })
      .catch(err => Promise.reject(err))
  })
})
