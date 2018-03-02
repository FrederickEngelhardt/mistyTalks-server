const express = require("express")
const router = express.Router();
const env = require("dotenv").config()

// Watson API references
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');

const text_to_speech = new TextToSpeechV1 ({
  username: process.env.USERNAME,
  password: process.env.PASSWORD
});
let params = {
  text: 'No text was sent.',
  voice: 'en-US_AllisonVoice',
  accept: 'audio/wav'
};

router.post('/speak', (req,res,next) => {
  console.log(req.body);
  params["text"] = req.body.text;
  console.log(params);
  let file = text_to_speech.synthesize(params).on('error', function(error) {
  console.log('Error:', error);
}).pipe(fs.createWriteStream('textResponse.wav'))
  return (
    res.status(200).json("Success")
  )
})

module.exports = router;
