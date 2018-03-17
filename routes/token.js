'use strict'

const express = require('express')
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.status(200).send(false)
    }
    res.status(200).send({loggedIn: true, cookie: payload})
  })
})

router.post('/token', (req, res, next) => {
  const { email_address, password } = req.body
    console.log("This is your token",req.body);
  if (!email_address) {
    return next({ status: 400, message: `Email must not be blank` })
  }
  if (!password) {
    return next({ status: 400, message: `Password must not be blank` })
  }
  let user;
  return knex('users')
    .where({email_address})
    .first()
    .then(data => {
      if (!data) {
        return next({ status: 400, message: `Bad email or password` })
      }
      user = data
      return bcrypt.compare(password, user.hashed_password)
      console.log('made it');
    })
    .then(() => {
      const claim = { user_id: user.id }
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '1 day'
      })
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: router.get('env') === 'production'
      })

      delete user.hashed_password
      res.status(201).send(user)
    })
})

router.delete('/token', (req, res, next) => {
  res.clearCookie('token')
  res.end()
})

module.exports = router
