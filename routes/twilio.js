const express = require('express')
const knex = require('../knex')
const router = express.Router()

router.post('/twilio/receive', (req, res) => {
  console.log(req.body)

  /*
    User Authorization
  */
  const authorization_numbers = [
    process.env.FREDERICK_NUMBER,
    process.env.SCOTT_NUMBER
  ]
  const received_number = req.body.From
  let authorized = false
  for (let i in authorization_numbers) {
    if (authorization_numbers[i] === received_number) {
      console.log('User is authorized.')
      authorized = true
    }
  }
  if (authorized === false) {
    console.log('User was rejected. Authorization is null.')
    return res
      .status(403)
      .send(
        `Your number ${received_number} is not authorized on this misty server.`
      )
  }
  /*
    End of user Authorization
  */

  // NOTE: variable used to enable message mode on twilio
  let message_mode = 'standard'

  /*
    Alexa message url removal
  */
  let message = req.body.Body
  let from = req.body.From
  let voice = undefined
  // Need a function to detect voice name between string characters ie #voice;allison; would only show allision.
  if (message.includes('#voice:')){
    let voice = message.split("#voice:")[1].split(";")[0]
    message = message.split("#voice:")[1].split(";")[1]
    console.log('message:', message, "voice:",voice);
  }
  if (message.includes('https://messages.alexa.amazon.com')) {
    message = message.split(`\nhttps://messages.alexa.amazon.com/`)[0]
  }
  /*
    End Alexa message url removal
  */

  // Removes '+' from number and a comma between each number (spacing for pauses) for the number to be said by misty prior to going to Watson
  let newArr = []
  newArr = from.split("")
  newArr.shift()
  for (let i = 0; i < newArr.length; i++) {
    if (i === newArr.length - 1) {
      from = newArr.join('')
    } else {
      newArr[i] += ' , '
    }
  }
  if (message_mode === 'identify') message = `You have a new message from ${from}, who says ${message}`
  if (message.includes('#disco')){
    message_mode = "disco"
    message = "You have unlocked a hidden feature: Disco!" + message
  }
  // API call to watson routes
  let response = {text: `${message}`}
  if (voice) response.voice = voice
    let unirest = require('unirest')

  let request = unirest('POST', 'http://localhost:3000/watson/receive')

  request.headers({
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  })

  request.type('json')
  request.send(response)

  request.end(function(response) {
    if (response.error) console.log(res.error)

    console.log(response.body)
    res.status(200).send('success')
  })
})

module.exports = router
