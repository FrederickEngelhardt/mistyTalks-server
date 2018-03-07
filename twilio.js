// Twilio Credentials
const env = require("dotenv").config()

const accountSid = process.env.TWILIO_ACCOUNT_SID.toString();
const authToken = process.env.TWILIO_AUTH_TOKEN.toString();
const myNum = process.env.MY_PHONE_NUMBER.toString()
const twilioNum = process.env.TWILIO_PHONE_NUMBER.toString()
console.log(accountSid,authToken, myNum, twilioNum);
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
const twilio = require('twilio')
const client = new twilio(accountSid, authToken);
// 
// client.messages.create({
//     body: 'Hello from Node',
//     to: myNum,  // Text this number
//     from: twilioNum // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));
