'use strict'

const express = require('express')
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/users', (req, res, next) => {
  return knex('users').orderBy('last_name', 'desc')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
})

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

router.get('/users/:id/lessons', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next({ status: 404, message: `Not Found` })
  }
  return knex('users')
    .join('lessons', 'users.id', 'lessons.user_client_id')
    .where('lessons.user_client_id', id)
    .first()
    .then(result => {
      res.status(200).json(result)
    })
})

router.post('/users', (req, res, next) => {

  const { first_name, last_name, phone_number, skill_level_id, bio, email_address, password } = req.body
  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
  if (!re.test(password)) {
    return next({ status: 400, message: `Password must contain at least one upper-case letter, one number, and one special character` })
  }
  if (!email_address) {
    return next({ status: 400, message: `Email must not be blank` })
  }
  return knex('users')
    .where({email_address})
    .first()
    .then(user => {
      if (!user) {
        return bcrypt.hash(password, 10)
      }
    })
    .then(hashed_password => {
      if (!hashed_password) {
        return next({ status: 400, message: `User account already exists` })

      }
      const insert = { first_name, last_name, phone_number, email_address, hashed_password, skill_level_id, bio}

      return knex.insert(insert, '*')
        .into('users')
    })
    .then(data => {
      if (!data) {
        return next({ status: 400, message: `User account already exists` })
      }
      const user = data[0]
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
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
})

router.patch('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next({ status: 400, message: `Invalid ID` })
  }
  return knex('users')
    .where({id})
    .first()
    .then(user => {
      if (!user) {
        return next({ status: 404, message: `User not found` })
      }
      const { phone_number, bio } = req.body
      const insert = { phone_number, bio }

      return knex('users')
        .update(insert, '*')
        .where({id})
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next({ status: 404, message: `Not Found` })
  }
  return knex('users')
    .where({id})
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
