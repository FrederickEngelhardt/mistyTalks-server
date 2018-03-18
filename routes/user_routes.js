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
    .then(async function() {
      let hashPassword = await bcrypt_hash_password(password)
      const dataFields = {
        first_name,
        last_name,
        email,
        password: hashPassword
      }
      console.log(dataFields);
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
        console.log("SERVER ERROR: Bcrypt password hash failed", `Input was: ${myPlaintextPassword}.`)
        return
      };
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        if(err) {
        console.log("SERVER ERROR: Bcrypt password hash failed", `Input was: ${myPlaintextPassword}.`)
          return
        };
        // Send hash: requires await async
        return resolve(hash)
      })
    })
  })
}

router.patch('/users/:id', async function (req, res, next) {
  const id = parseInt(req.params.id)
  const { email, first_name, last_name, previous_password, password } = req.body
  if (Number.isNaN(id)) {
    return next({ status: 400, message: `Invalid ID` })
  }
  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
  if (!re.test(password)) {
    return next({
      status: 400,
      message: `Password needs to be at least 8 digits. May contain any characters.`
    })
  }
  // Hash Passwords
  let hashed_previous_password = await bcrypt_hash_password(previous_password)
  let hashed_new_password = await bcrypt_hash_password(password)
  // Load hash from your password DB.
  return knex('users')
    .where({ id })
    .first()
    .then(user => {
      if (!user) {
        return next({ status: 404, message: `User not found` })
      }
      return bcrypt.compare(previous_password, user.password)
    }).then((bcryptResponse) => {
      // If the passwords do not match.
      if (!bcryptResponse) {
        return next({ status: 403, message: `Previous user password does not match.` })
      }
      // Update the user if they do match
      const insert = {email, first_name, last_name, "password": hashed_new_password}
      return knex('users')
      .update(insert, '*')
      .where({ id })
    })
    .then(data => {
      return res.status(201).send("User has been updated.")
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
