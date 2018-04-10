const express = require('express')
const knex = require('../knex')
const router = express.Router()

const authorized_phone_ip_address = (phone_number) => {
  return knex("misty_preferences")
      .where({auth_numbers_string: phone_number})
      .then( (data) => {
        if (!data[0]) {
          return {status: 403, message: "No IP Address authorized for that phone number."}
        }
        return {
          status: 200,
          message: "Success",
          voice: data[0].misty_voice_name,
          ip_address: data[0].ip_address
        }
      })
}

router.post('/twilio/receive', async function (req, res, next) {
  const received_number = req.body.From
  /*
    Checks to see if the authorized number is database and
    returns ip address of related authorized number.
  */
  const authorized_prefs = await authorized_phone_ip_address(received_number)
  if (authorized_prefs.status === 403) return next(authorized_prefs.message)
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
  let response = {
    text: `${message}`,
    voice: `${authorized_prefs.voice}`,
    ip_address: `${authorized_prefs.ip_address}`}
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
    res.status(200).send('success')
  })
})

module.exports = router
