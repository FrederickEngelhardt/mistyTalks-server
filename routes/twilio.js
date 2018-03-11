const express = require('express')
const knex = require('../knex')
const router = express.Router()
// const watson = require('./watson')

router.post('/twilio/receive', (req, res) => {
  console.log(req.body);

  // Message is a string
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

    // console.log(body);
  });
  res.status(200).send("success")
})
// { ToCountry: 'US',
//   ToState: 'OR',
//   SmsMessageSid: 'SMed3515cf69cb24fc7902601e7a254044',
//   NumMedia: '0',
//   ToCity: '',
//   FromZip: '97230',
//   SmsSid: 'SMed3515cf69cb24fc7902601e7a254044',
//   FromState: 'OR',
//   SmsStatus: 'received',
//   FromCity: 'PORTLAND',
//   Body: 'Yeah ',
//   FromCountry: 'US',
//   To: '+19718035516',
//   ToZip: '',
//   NumSegments: '1',
//   MessageSid: 'SMed3515cf69cb24fc7902601e7a254044',
//   AccountSid: 'ACa61dd227286ddc76fbe8e939398b2aab',
//   From: '+15038063822',
//   ApiVersion: '2010-04-01' }

module.exports = router;
