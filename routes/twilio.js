const express = require('express')
const knex = require('../knex')
const router = express.Router()
// const watson = require('./watson')

function testing(body, res) {
  console.log(body);

  const authorization_numbers = [process.env.FREDERICK_NUMBER, process.env.SCOTT_NUMBER]
  const received_number = '+15038063822'
  let authorized = false
  console.log(body.From, authorization_numbers[0]);
  for (let i in authorization_numbers) {
    if (authorization_numbers[i] === received_number) {
      authorized = true
    }
  }
  if (authorized === false) {
    return res.status(403).send(`Your number ${received_number} is not authorized on this misty server.`)
  }
  // Message is a string
  let message = body.Body
  message.includes('#voice')
  if (message.includes("https://messages.alexa.amazon.com")) {
    message = message.split(`\nhttps://messages.alexa.amazon.com/`)[0]
    console.log(message);
  }
  // // API call to watson routes
  // let unirest = require("unirest");
  //
  // let request = unirest("POST", "http://localhost:3000/watson/receive");
  //
  // request.headers({
  //   "Cache-Control": "no-cache",
  //   "Content-Type": "application/json"
  // });
  //
  // request.type("json");
  // request.send({
  //   "text": `${message}`
  // });
  //
  // request.end(function (response) {
  //   if (response.error) throw new Error(res.error);
  //
  //   console.log(response.body);
  //   res.status(200).send("success")
  // });
}
// testing({
//   ToCountry: 'US',
//   ToState: 'OR',
//   NumMedia: '0',
//   ToCity: '',
//   FromZip: '97230',
//   FromState: 'OR',
//   SmsStatus: 'received',
//   FromCity: 'PORTLAND',
//   Body: 'Alexa\nhttps://messages.alexa.amazon.com/s/UvmVAW45xZnpzYlWqsB3nC',
//   FromCountry: 'US',
//   To: '+19718035516',
//   ToZip: '',
//   NumSegments: '1',
//   From: '+15038063822',
//   ApiVersion: '2010-04-01'
// })

router.post('/twilio/receive', (req, res) => {
  console.log(req.body);

  /*
    User Authorization
  */
  const authorization_numbers = [process.env.FREDERICK_NUMBER, process.env.SCOTT_NUMBER]
  const received_number = req.body.From
  let authorized = false
  for (let i in authorization_numbers) {
    if (authorization_numbers[i] === received_number) {
      console.log("User is authorized.");
      authorized = true
    }
  }
  if (authorized === false) {
    console.log("User was rejected. Authorization is null.");
    return res.status(403).send(`Your number ${received_number} is not authorized on this misty server.`)
  }
  /*
    End of user Authorization
  */

  /*
    Alexa message url removal
  */
  let message = req.body.Body
  message.includes('#voice')
  if (message.includes("https://messages.alexa.amazon.com")) {
    message = message.split(`\nhttps://messages.alexa.amazon.com/`)[0]
    console.log(message);
  }
  /*
    End Alexa message url removal
  */

  /*
    #voice commands for watson synthesize
  */



  // API call to watson routes
  let unirest = require("unirest");

  let request = unirest("POST", "http://localhost:3000/watson/receive");

  request.headers({
    "Cache-Control": "no-cache",
    "Content-Type": "application/json"
  });

  request.type("json");
  request.send({
    "text": `${message}`
  });

  request.end(function(response) {
    if (response.error) throw new Error(res.error);

    console.log(response.body);
    res.status(200).send("success")
  });
})

module.exports = router;
