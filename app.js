const express = require("express");
const http = require("http");
const socket = require("socket.io");
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
let server = app.listen(port, function() {
  console.log(`listening to requests on port ${port}`);
});
// Socket SETUP on the server awaiting to be called...
let io = socket.listen(server);

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
  console.log("New connection", socket.id);
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('mistyChannel', function(mistyChannel) {
        console.log(`User has joined ${mistyChannel}`);
        socket.join(mistyChannel);
    });
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

module.exports = app
