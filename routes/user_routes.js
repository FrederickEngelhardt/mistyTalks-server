'use strict'

const express = require('express')
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()

// GET FOR ALL ITEMS IN USERS TABLE (id, email, password, misty_voice, set_emotions, time_restriction_start, time_restriction_end)
router.get('/users', (req, res, next) => {
  return knex('users').orderBy('id', 'asc')
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
    .where({id})
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
  return knex('users').orderBy('id', 'asc')
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
    .where({id})
    .first()
    .then(data => {
      console.log(data);
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
  console.log(req.body);
  //   if (!re.test(password)) {
  //     return next({ status: 400, message: `Password must contain at least one upper-case letter, one number, and one special character` })
  //   }
  // if (!email || !email.contains('@') && !email.contains('.')){
  //   return next({ status: 400, message: `Email must be valid` })
  //}
  // return knex('users')
  //     .where({email})
  //     .first()
  //     .then(user => {
  //       if (!user) {
  //           return password
  //         }
  //             })
  //             .then(password => {
              //   if (!password) {
              //     return next({ status: 400, message: `User account already exists` })
              //   }
              //})
              const dataFields = {first_name, last_name, email, password}
              console.log(dataFields);
              return knex.insert(dataFields, '*').into ('users')
              .then(() => {res.status(200).send('success')
            })
            })
//             .then( data => {
//               if (!data){
//                 return next({ status: 400, message: `User account already exists` })
//               }
//               const user = data[0];
//               const claim = { user_id: user.id }
//               })
//                 .catch(err => {
//                   next(err)
// })
// POST route to post to user
// router.post('/users', (req, res, next) => {
//
//   const { email, password } = req.body
//   // left out.. misty_voice, set_emotions, time_restriction_start, time_restriction_end
//   const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
//   if (!re.test(password)) {
//     return next({ status: 400, message: `Password must contain at least one upper-case letter, one number, and one special character` })
//   }
//   if (!email) {
//     return next({ status: 400, message: `Email must not be blank` })
//   }
//   return knex('users')
//     .where({email})
//     .first()
//     .then(user => {
//       if (!user) {
//         return bcrypt.hash(password, 10)
//       }
//     })
//     .then(hashed_password => {
//       if (!hashed_password) {
//         return next({ status: 400, message: `User account already exists` })
//
//       }
//       const insert = { email, password}
//  // left out.. misty_voice, set_emotions, time_restriction_start, time_restriction_end
//
//       return knex.insert(insert, '*')
//         .into('users')
//     })
//     .then(data => {
//       if (!data) {
//         return next({ status: 400, message: `User account already exists` })
//       }
//       const user = data[0]
//       const claim = { user_id: user.id }
//       const token = jwt.sign(claim, process.env.JWT_KEY, {
//         expiresIn: '1 day'
//       })
//
//       res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//         secure: router.get('env') === 'production'
//       })
//
//       delete user.hashed_password
//       res.status(201).json(user)
//     })
//     .catch(err => {
//       next(err)
//     })
// })



router.post('/users/:id', (req, res, next) => {
  first_name;
  last_name;
  const { email, password } = req.body
  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
  console.log(req.body);

              const dataFields = {first_name, last_name, email, password}
              return knex.insert(dataFields, '*').into ('users')
              .then(() => {res.status(200).send('success')
            })
            })





router.patch('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const { email, first_name, last_name, password } = req.body
  if (Number.isNaN(id)) {
    return next({ status: 400, message: `Invalid ID` })
  }

  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
  if (!re.test(password)){
    return next({ status: 400, message: `Password needs to be at least 8 digits. May contain any characters.` })
  }else {
    console.log('passed the password check');
  }
  return knex('users')
    .where({id})
    .first()
    .then(user => {
      if (!user) {
        return next({ status: 404, message: `User not found` })
      }
      const insert = { email, first_name, last_name, password}
      console.log(insert);
      return knex('users')
        .update(insert, '*')
        .where({id})
    })
    .then(data => {
      res.status(201).send("User information updated")
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
