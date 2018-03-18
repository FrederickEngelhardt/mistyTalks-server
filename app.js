const express = require("express");
const http = require("http");
const socket = require("socket.io");
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

// server side socket variable, this will not cross over into the front end
let server = app.listen(3500, function() {
  console.log('listening to requests on port 3500');
});

app.use(express.static('public'))

// Socket SETUP on the server awaiting to be called...
let io = socket(server);

// when the client connects, we are going to listen with the connection method
  // fire callback function that uses a new socket
  // still awaiting call...by itself it just waits
io.on('connection', function (socket){
  // socket.id is a unique connection (like an ip address) that changes every time
  console.log("made socket connection", socket.id)

  // individual socket is on and when loading is finished, ...
  socket.on('load', function (data) {
    io.sockets.emit('load', data)
  })


})


// ROUTES
const watsonRoutes = require('./routes/watson')
const twilioRoutes = require('./routes/twilio')
const userRoutes = require('./routes/user_routes')
const token = require('./routes/token')


// ALLOW CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(twilioRoutes)
app.use(watsonRoutes)
app.use(userRoutes)
app.use(token)


app.use((req, res, next) => {
  res.sendStatus(404)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).send(err.message)
})

app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
