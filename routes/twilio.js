const express = require('express')
const knex = require('../knex')
const router = express.Router()

router.post('/twilio/receive', (req, res) => {
  console.log(req.body);
  /*
    TODO: Remove Authorization basic base64 string and figure out why it is even in there...
    TODO: Check to see if user has authorization to send information to local misty
                1. If sent number is not authorized in the user account then...
                2. Log request on server.
  */
  // Message is a string -> Body is a key from req.body
  let message = req.body.Body
  message.includes('#voice')

  // API call to watson routes
  let request = require("request");

  let options = {
    method: 'POST',
    url: 'http://localhost:3000/watson/receive',
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: 'Basic ZThiM2QwMjQtOGUyMC00YjU4LTg5MzQtZWZiZGI1NDk2MzIyOmdzeDI4R3FpWG1SSQ==',
      Accept: 'audio/wav',
      'Content-Type': 'application/json'
    },
    body: {
      voice: `${selected_voice}`,
      text: `${message}`
    },
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
  });
  res.status(200).send("success")
})

module.exports = router;
