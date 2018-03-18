'use strict'

const express = require('express')
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()

// GET FOR ALL ITEMS IN USERS TABLE (id, email, password, misty_voice, set_emotions, time_restriction_start, time_restriction_end)
router.get('/users', (req, res, next) => {
  return knex('users')
    .orderBy('id', 'asc')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

// GET FOR ALL ITEMS IN USERS TABLE (email, password, misty_voice, set_emotions, time_restriction_start, time_restriction_end)
router.get('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next({ status: 404, message: `Not Found` })
  }
  return knex('users')
    .where({ id })
    .first()
    .then(data => {
      if (!data) {
        return next({ status: 404, message: `Not Found` })
      }
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

// GET ALL ACCESS TO MISTY_PREFERENCES (preference_name, robot_name, ip_address, port_number)
router.get('/misty_preferences', (req, res, next) => {
  return knex('users')
    .orderBy('id', 'asc')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

// GET INDIVIDUAL ITEMS IN MISTY_PREFERENCES TABLE BY ID(preference_name, robot_name, ip_address, port_number)
router.get('/users/:id/misty_preferences', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next({ status: 404, message: `Not Found` })
  }
  return knex('misty_preferences')
    .where({ id })
    .first()
    .then(data => {
      console.log(data)
      if (!data) {
        return next({ status: 404, message: `Not Found` })
      }
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

// POST Route Posting a new id with info  ...x-www.form-urlencoded

router.post('/users', (req, res, next) => {
  const { first_name, last_name, email, password } = req.body
  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/

  if (!re.test(password)) {
    return next({
      status: 400,
      message: `Password must contain at least eight characters`
    })
  }
  if (!email || (!email.includes('@') && !email.includes('.'))) {
    return next({ status: 400, message: `Email must be valid` })
  }
  return knex('users')
    .where({ email })
    .first()
    .then(user => {
      if (!user) {
        return password
      }
    })
    .then(password => {
      if (!password) {
        return next({ status: 400, message: `User account already exists` })
      }
      return
    })
    .then(() => {
      let hashPassword = bcrypt_hash_password(password)
      const dataFields = {
        first_name,
        last_name,
        email,
        password: hashPassword
      }
      return knex
        .insert(dataFields, '*')
        .into('users')
        .then(() => {
          res.status(200).send('success')
        })
    })
})

/*
  Use this function hash any number of passwords sent through the parameters
*/
const bcrypt_hash_password = (myPlaintextPassword) => {
  return new Promise((resolve) => {
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) {
        console.log("SERVER ERROR: Bcrypt password hash failed")
        return next({ status: 500, message: `Internal Server Error` })
      };
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        if(err) {
          console.log("SERVER ERROR: Bcrypt password hash failed")
          return next({ status: 500, message: `Internal Server Error` })
        };
        // Store hash in your password DB.
        return resolve(hash)
      })
    })
  })
}

router.patch('/users/:id', async function (req, res, next) {
  const id = parseInt(req.params.id)
  const { email, first_name, last_name, last_password, password } = req.body
  if (Number.isNaN(id)) {
    return next({ status: 400, message: `Invalid ID` })
  }
  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
  if (!re.test(password)) {
    return next({
      status: 400,
      message: `Password needs to be at least 8 digits. May contain any characters.`
    })
  } else {
    console.log('passed the password check')
  }
  // Hash Passwords
  let hashed_last_password = bcrypt_hash_password(last_password)
  let hashed_new_password = bcrypt_hash_password(password)

  return knex('users')
    .where({ id })
    .first()
    .then(user => {
      if (!user) {
        return next({ status: 404, message: `User not found` })
      }
      if (user.password !== hashed_last_password) {
        return next({ status: 400, message: `Invalid previous password.` })
      }
      const insert = { email, first_name, last_name, password }
      console.log(insert)
      return knex('users')
        .update(insert, '*')
        .where({ id })
    })
    .then(data => {
      res.status(201).send('User information updated.')
    })
    .catch(err => {
      next(err)
    })
})

// //delete set up...not working...update or delete on table users violates foreign key constraint misty_preferences_user_id_foreign on table misty_preferences

// router.delete('/misty_preferences/:id', (req, res, next) => {
//   const id = parseInt(req.params.id)
//   if (Number.isNaN(id)) {
//     return next({ status: 404, message: `Not Found` })
//   }
//   return knex('users')
//     .where({id})
//     .first()
//     .del()
//     .then(data => {
//       res.status(204).json(data)
//     })
//     .catch(err => {
//       next(err)
//     })
// })

module.exports = router
