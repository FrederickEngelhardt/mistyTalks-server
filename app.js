const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const knex = require('knex')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

// ROUTES
const watsonRoutes = require('./routes/watson')
const twilioRoutes = require('./routes/twilio')
const userRoutes = require('./routes/user_routes')

app.use(twilioRoutes)
app.use(watsonRoutes)
app.use(userRoutes)

app.use((req, res, next) => {
  res.sendStatus(404)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).send(err.message)
})

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
