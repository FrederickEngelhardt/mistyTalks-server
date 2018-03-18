'use strict'

const express = require('express')
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/users/token', (req, res, next) => {
// removes the token= from the string
  if (!req.headers.cookie.includes("token")) {
    return next({status: 403, message: "You do not have access to this page."})
  }
  let token = req.headers.cookie.split("token=")[1].split("; io=")[0]
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    console.log("Payload", payload);
    if (err) {
      return res.status(403).send(false)
    }
    res.status(200).send({loggedIn: true, cookie: payload})
  })
})

router.post('/users/token', (req, res, next) => {
  console.log("made it to token 1");
  const { email, password } = req.body
  console.log("made it to token 2", email, password);
    console.log("This is your token",req.body);

  if (!email) {
    return next({ status: 400, message: `Email must not be blank` })
  }
  if (!password) {
    return next({ status: 400, message: `Password must not be blank` })
  }
  let user;
  return knex('users')
    .where({email})
    .first()
    .then(data => {
      if (!data) {
        return next({ status: 400, message: `Bad email or password` })
      }
      user = data
      return bcrypt.compare(password, user.password)
      console.log('made it');
    })
    .then(() => {
      const claim = {
        user_id:  `${user.id}`,
        email: `${user.email}`
       }
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '1 day'
      })
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: router.get('env') === 'production'

      })

      delete user.password
      res.status(201).send(user)
    })
})

router.delete('/users/token', (req, res, next) => {
  res.clearCookie('token')
  res.end()
})

module.exports = router
