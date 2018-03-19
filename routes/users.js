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
    return next({
      status: 404,
      message: `Not Found`
    })
  }
  return knex('users')
    .where({
      id
    })
    .first()
    .then(data => {
      if (!data) {
        return next({
          status: 404,
          message: `Not Found`
        })
      }
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
    return next({
      status: 404,
      message: `Not Found`
    })
  }
  return knex('misty_preferences')
    .where("misty_user_preference_id", id)
    .orderBy('id', 'asc')
    .then(data => {
      if (!data) {
        return next({
          status: 404,
          message: `Not Found`
        })
      }
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  })

router.get('/users/:user_id/misty_preferences/:id', (req, res, next) => {
  const {
    user_id,
    id
  } = req.params
  if (Number.isNaN(id) || Number.isNaN(user_id)) {
    return next({
      status: 404,
      message: `Not Found`
    })
  }
  return knex('misty_preferences')
    .where({
      misty_user_preference_id: user_id,
      id: id
    })
    .first()
    .then(data => {
      if (!data) {
        return next({
          status: 404,
          message: `Not Found`
        })
      }
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

// POST Route Posting a new id with info  ...x-www.form-urlencoded
router.post('/users', (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    password
  } = req.body
  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/

  if (!re.test(password)) {
    return next({
      status: 400,
      message: `Password must contain at least eight characters`
    })
  }
  if (!email || (!email.includes('@') && !email.includes('.'))) {
    return next({
      status: 400,
      message: `Email must be valid`
    })
  }
  return knex('users')
    .where({
      email
    })
    .first()
    .then(user => {
      if (!user) {
        return password
      }
    })
    .then(password => {
      if (!password) {
        return next({
          status: 400,
          message: `User account already exists`
        })
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
      return knex
        .insert(dataFields, '*')
        .into('users')
        .then((user) => {
          const claim = {
            user_id: `${user[0].id}`,
            email: `${user[0].email}`
          }
          const token = jwt.sign(claim, process.env.JWT_KEY, {
            expiresIn: '1 day'
          })
          res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            secure: router.get('env') === 'production'

          })
        })
        .then(() => {
          res.status(200).json({
            status: "success",
            message: `User: ${email} has been created!`
          })
        })
    })
})

router.post('/users/:id/misty_preferences', (req, res, next) => {
  const {
    id
  } = req.params
  const {
    misty_user_preference_id,
    preference_name,
    robot_name,
    ip_address,
    auth_numbers_string,
    misty_voice_name,
    misty_face_name,
    set_emotion_valence,
    set_emotion_arousal,
    set_emotion_dominance,
    time_restriction_start,
    time_restriction_end
  } = req.body

  const dataFields = {
    misty_user_preference_id,
    preference_name,
    robot_name,
    ip_address,
    auth_numbers_string,
    misty_voice_name,
    misty_face_name,
    set_emotion_valence,
    set_emotion_arousal,
    set_emotion_dominance,
    time_restriction_start,
    time_restriction_end
  }
  return knex
    .insert(dataFields, '*')
    .into('misty_preferences')
    .then(() => {
      res.status(200).json({
        status: "success",
        message: `Preference: ${dataFields.preference_name} has been created!`
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
      if (err) {
        console.log("SERVER ERROR: Bcrypt password hash failed", `Input was: ${myPlaintextPassword}.`)
        return {"status": "Internal Server Error with bcrypt"}
      };
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        if (err) {
          console.log("SERVER ERROR: Bcrypt password hash failed", `Input was: ${myPlaintextPassword}.`)
          return {"status": "Internal Server Error with bcrypt"}
        };
        // Send hash: requires await async
        return resolve(hash)
      })
    })
  })
}

router.patch('/users/:id', async function(req, res, next) {
  const id = parseInt(req.params.id)
  const {
    email,
    first_name,
    last_name,
    previous_password,
    password
  } = req.body
  if (Number.isNaN(id)) {
    return next({
      status: 400,
      message: `Invalid ID`
    })
  }
  if (previous_password && password) {
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
    return knex('users')
      .where({
        id
      })
      .first()
      .then(user => {
        if (!user) {
          return next({
            status: 404,
            message: `User not found`
          })
        }
        return bcrypt.compare(previous_password, user.password)
      }).then((bcryptResponse) => {
        // If the passwords do not match.
        if (!bcryptResponse) {
          return next({
            status: 403,
            message: `Previous user password does not match.`
          })
        }
        // Update the user if they do match
        const insert = {
          email,
          first_name,
          last_name,
          "password": hashed_new_password
        }
        return knex('users')
          .update(insert, '*')
          .where({
            id
          })
      })
      .then(data => {
        return res.status(201).send("User has been updated.")
      })
      .catch(err => {
        next(err)
      })
  } else {
    // Load hash from your password DB.
    return knex('users')
      .where({
        id
      })
      .first()
      .then(user => {
        if (!user) {
          return next({
            status: 404,
            message: `User not found`
          })
        }
      }).then(() => {
        // Update the user if they do match
        const insert = {
          email,
          first_name,
          last_name
        }
        return knex('users')
          .update(insert, '*')
          .where({
            id
          })
      })
      .then(data => {
        return res.status(201).send("User has been updated.")
      })
      .catch(err => {
        next(err)
      })
  }
})
router.patch('/users/:user_id/misty_preferences/:id', async function(req, res, next) {
  // This id refers to the id after misty_preferences
  const {
    id,
    user_id
  } = req.params
  if (Number.isNaN(id) || Number.isNaN(user_id)) {
    return next({
      status: 400,
      message: `Bad request. User ID or Preference ID is invalid.`
    })
  }
  const {
    misty_user_preference_id,
    preference_name,
    robot_name,
    ip_address,
    auth_numbers_string,
    misty_voice_name,
    misty_face_name,
    set_emotion_valence,
    set_emotion_arousal,
    set_emotion_dominance,
    time_restriction_start,
    time_restriction_end
  } = req.body
  const dataFields = {
    misty_user_preference_id,
    preference_name,
    robot_name,
    ip_address,
    auth_numbers_string,
    misty_voice_name,
    misty_face_name,
    set_emotion_valence,
    set_emotion_arousal,
    set_emotion_dominance,
    time_restriction_start,
    time_restriction_end
  }
  if (Number.isNaN(id)) {
    return next({
      status: 400,
      message: `Invalid ID`
    })
  }
  // Load hash from your password DB.
  return knex('misty_preferences')
    .where({
      misty_user_preference_id: user_id,
      id: id
    })
    .first()
    .then(preference => {
      if (!preference) {
        return next({
          status: 404,
          message: `Preference not found`
        })
      }
    }).then(() => {
      // Update the user if they do match
      return knex('misty_preferences')
        .update(dataFields, '*')
        .where({
          id
        })
    })
    .then(data => {
      return res.status(201).send("User has been updated.")
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/users/:user_id/misty_preferences/:id', (req, res, next) => {
  // NOTE: parseInt might fail here because of ES6 syntax.
  const {id, user_id} = parseInt(req.params)
  if (Number.isNaN(id) || Number.isNaN(user_id)) {
    return next({
      status: 404,
      message: `Not Found`
    })
  }
  return knex('users')
    .where({
      id
    })
    .first()
    .del()
    .then(data => {
      res.status(204).json(data)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
