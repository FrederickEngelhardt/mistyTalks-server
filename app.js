const express = require("express");
const http = require("http");
const socket = require("socket.io");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();
const knex = require('./knex')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// server side socket variable, this will not cross over into the front end
const server = app.listen(port, function() {
  console.log(`listening to requests on port ${port}`);
});
// Socket SETUP on the server awaiting to be called...
const io = socket.listen(server);


// Listens for user connection and reads their id.

io.sockets.on('connection', function(socket) {

    // Replaces GET route for misty_user_preferences
    socket.on('GET/users/:id/misty_preferences', function(id) {
      if (Number.isNaN(id)) {
        return console.log({
          status: 404,
          message: `Not Found`
        })
      }
      return knex('misty_preferences')
        .where('misty_user_preference_id', id)
        .orderBy('id', 'asc')
        .then(data => {
          if (!data) {
            return console.log({
              status: 404,
              message: `Not Found`
            })
          }
          socket.emit('GET/users/:id/misty_user_preferences/response', data)
        })
        .catch(err => {
          console.log(error);
        })
      })
      socket.on('GET/users/:id', (id) => {
        if (Number.isNaN(id)) {
          return console.log({
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
              return console.log({
                status: 404,
                message: `Not Found`
              })
            }
            delete data.password
            socket.emit('GET/users/:id/response', data)
          })
          .catch(err => {
            console.log(err)
          })
      })
});

// now, it's easy to send a message to just the clients in a given room
let mistyChannel = "email@email.com";
io.sockets.in(mistyChannel).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
io.sockets.in('foobar').emit('message', 'anyone in this room yet?');

app.use(express.static('public'))

// ROUTES
const watsonRoutes = require('./routes/watson')
const twilioRoutes = require('./routes/twilio')
const userRoutes = require('./routes/users')
const token = require('./routes/token')


// ALLOW CORS HEADERS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(token)
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

module.exports = app
