const express = require('express')
const knex = require('../knex')
const router = express.Router()
// const watson = require('./watson')

function testing(body, res) {
  console.log(body)

  const authorization_numbers = [
    process.env.FREDERICK_NUMBER,
    process.env.SCOTT_NUMBER
  ]
  const received_number = '+15038063822'
  let authorized = false
  console.log(body.From, authorization_numbers[0])
  for (let i in authorization_numbers) {
    if (authorization_numbers[i] === received_number) {
      authorized = true
    }
  }
  if (authorized === false) {
    return res
      .status(403)
      .send(
        `Your number ${received_number} is not authorized on this misty server.`
      )
  }

  // 1st occurance
  // Message is a string
  let message = body.Body
  message.includes('#voice')
  if (message.includes('https://messages.alexa.amazon.com')) {
    message1 = message.split(`\nhttps://messages.alexa.amazon.com/`)[0]
    message =
      'You have a new message from .' + body.From + '. who says .' + message1
    console.log(message, 1)
  }
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

  /*
    Alexa message url removal
  */
  let message = req.body.Body
  let from = req.body.From
  // Need a function to detect voice name between string characters ie #voice;allison; would only show allision.
  message.includes('#voice')
  if (message.includes('https://messages.alexa.amazon.com')) {
    message = message.split(`\nhttps://messages.alexa.amazon.com/`)[0]
  }
  /*
    End Alexa message url removal
  */
 from.includes('#voice')
let newArr = []
let newStr = ''
newArr = from.split("")
newArr.shift()
for (let i = 0; i < newArr.length; i++){
  if (i === newArr.length-1){
    from = newArr.join('')
  }
  else {
    newArr[i] += ' , '
  }
}

// Secondary way for above...
// from.includes('#voice')
// let newArr = []
// let newStr = ''
// newArr = from.split("")
// newArr.shift()
// for (let i = 0; i < newArr.length; i++){
//  i === newArr.length-1 ? from = newArr.join('') : newArr[i] += ' , '
// }





  /*
    #voice commands for watson synthesize
  */

  // API call to watson routes
  let unirest = require('unirest')

  let request = unirest('POST', 'http://localhost:3000/watson/receive')

  request.headers({
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  })

  request.type('json')
  request.send({
    text: `You have a new message from ${from}. who says ${message}`
  })

  request.end(function(response) {
    if (response.error) throw new Error(res.error)

    console.log(response.body)
    res.status(200).send('success')
  })
})

module.exports = router
