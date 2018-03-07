const express = require("express")
const router = express.Router();
const env = require("dotenv").config()
const FileReader = require('filereader')
// Watson API references
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');
const fsThen = require('fs-then-native')
const converter = require('convert-string')
// const txt = require('unit8array-loader')

const text_to_speech = new TextToSpeechV1({
  username: process.env.USERNAME,
  password: process.env.PASSWORD
});
function read() {
  return new Promise((resolve, reject) => {
    const path = './textResponse.wav'
    let file = fs.readFileSync(path)
      var b = new Buffer(file);
      // ArrayBuffer
      var ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      // TypedArray
      var ui8 = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT).toString()
      return resolve(ui8)
  })
}

function writeFile(text) {
  let params = {
    text: 'No text was sent.',
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  }
  if (text) params["text"] = text;
  return new Promise((resolve, reject) => {
    text_to_speech.synthesize(params).on('error', function(error) {
      console.log('Error:', error);
    }).pipe(fs.createWriteStream('textResponse.wav'));
    resolve('resolved')
    // check for promise to resolve with file
  })
}

router.post('/speak', async function(req, res, next) {
  console.log('speak api called');
  console.log(req.body.text);
  // const [result1, result2] = await Promise.all([read(),writeFile(req.body.text)])
  const result1 = await writeFile(req.body.text)
  const result2 = await read()
  // #NOTE should be read() then writeFile but async issues...
  // const [result1, result2] = await Promise.all([writeFile(req.body.text), read()])
  console.log("made it");
  let payload = {
    "FilenameWithoutPath": "textResponse.wav",
    "DataAsByteArrayString": result2,
    "ImmediatelyApply": false,
    "OverwriteExisting": true
  }
  // console.log("this is result 1", result1, "this is result2", result2);
  // console.log("This is the payload sent", payload);
  return res.status(200).json(payload)
  // .then((byte)=>{
  //   console.log(byte, "this is the byte");
  //   return res.status(200).json(payload)
  // })
})

module.exports = router;
