const fs = require('fs')
const path = require('path')
const mocha = require('mocha')
const chai = require('chai')
const knex = require('../knex')
const expect = chai.expect

// *** Users Table Testing ***
describe('Users Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '../db/migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('users')
      .columnInfo()
      .then(actual => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('users_user_id_seq'::regclass)"
          },
          first_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },
          last_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },
          email: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },
          password: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"

          }
        }
        for (const column in expected) {
          const err = `Column ${column} is not the same`
          expect(actual[column].type).to.equal(expected[column].type, err)
          expect(actual[column].nullable).to.equal(
            expected[column].nullable,
            err
          )
        }
      })
      .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('users').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('users').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})

// *** Users-Misty_Preferences JOINED Table Testing ***
describe('Users-Misty_Preferences Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '../db/migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('users_misty_preferences')
    .columnInfo()
    .then(actual => {
      const expected = {
        id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: "nextval('misty_preferences_id_seq'::regclass)"
        },
        user_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: "nextval('misty_preferences_misty_preferences_user_id_user_id_seq'::regclass)"
        // },
        // user_id: {
        //   type: 'foreign',
        //   maxLength: null,
        //   nullable: false,
        //   defaultValue: "nextval('misty_preferences_user_id_user_id_seq'::regclass)"
        }
      }
      for (const column in expected) {
        const err = `Column ${column} is not the same`
        expect(actual[column].type).to.equal(expected[column].type, err)
        expect(actual[column].nullable).to.equal(
          expected[column].nullable,
          err
        )
      }
    })
    .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('users_misty_preferences').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('users_misty_preferences').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})


// *** Misty_Preferences Testing ***
describe('Misty_Preferences Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '../db/migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('misty_preferences')
      .columnInfo()
      .then(actual => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('misty_preferences_misty_preference_id_seq'::regclass)"
          },
          preference_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },

          robot_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },
          auth_numbers_string: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },
          ip_address: {
            type: 'character varying',
            maxLength: 25,
            nullable: false,
            defaultValue: "''::character varying"
          },

          port_number: {
            type: 'integer',
            maxLength: 25,
            nullable: false,
            defaultValue: "''::character varying"
          },
          misty_voice: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },
          set_emotion: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          }
        }
        for (const column in expected) {
          const err = `Column ${column} is not the same`
          expect(actual[column].type).to.equal(expected[column].type, err)
          expect(actual[column].nullable).to.equal(
            expected[column].nullable,
            err
          )
        }
      })
      .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('misty_preferences').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('misty_preferences').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})
