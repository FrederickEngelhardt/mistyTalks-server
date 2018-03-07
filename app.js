const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 3000;
// const watsonRoutes = require("./watson");
const twilioRoutes = require("./twilio");
const bodyParser = require('body-parser')
const app = express();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/sms', (req, res) => {
  console.log(req.body);
  const twiml = new MessagingResponse();
  // 
  // twiml.message('The Robots are coming! Head for the hills!');
  //
  // res.writeHead(200, {'Content-Type': 'text/xml'});
  // res.end(twiml.toString());
})
// app.use(twilioRoutes)
// app.use(watsonRoutes)

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));
