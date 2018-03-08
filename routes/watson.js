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
    const writable = fs.createWriteStream('textResponse.wav')
    text_to_speech.synthesize(params).on('error', function(error) {
      console.log('Error:', error);
    }).pipe(writable)
    writable
      .on('error', (err) => {
        reject(err)
      })
      .on('finish', resolve)
    // check for promise to resolve with file
  })
}
function writeAudioMisty(byteStreamArray) {
  return new Promise((resolve, reject) => {
    var unirest = require("unirest");

    var req = unirest("POST", "http://192.168.1.129/Api/SaveAudioAssetToRobot");

    req.headers({
      "Cache-Control": "no-cache"
    });

    req.send(JSON.stringify({
      "FilenameWithoutPath": "textResponse.wav",
      "DataAsByteArrayString": `${byteStreamArray}`,
      "ImmediatelyApply": "false",
      "OverwriteExisting": "true"
    }));

    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      else {
        console.log(res.body);
        resolve("resolved")
      }
    });
  })
}


function playAudio(misty_filename) {
  return new Promise((resolve, reject) => {
    console.log("promise called");
    var unirest = require("unirest");

    var req = unirest("POST", "http://192.168.1.129/Api/PlayAudioClip");

    req.headers({
      "Cache-Control": "no-cache"
    });

    req.send("{\n  \"AssetId\":\"textResponse.wav\",\n}");

    req.end(function(res) {
      if (res.error) throw new Error(res.error);
      else {
        console.log("promise resolved");
        resolve
      }
    });
  })
}
// playAudio()

router.post('/watson/receive', async function(req, res, next) {
  console.log('speak api called');
  console.log(req.body.text);
  // const [result1, result2] = await Promise.all([read(),writeFile(req.body.text)])
  const result1 = await writeFile(req.body.text)
  const result2 = await read()
  // console.log(result2);
  // #NOTE should be read() then writeFile but async issues...
  // const [result1, result2] = await Promise.all([writeFile(req.body.text), read()])
  console.log("made it");
  let payload = {
    "FilenameWithoutPath": "textResponse.wav",
    "DataAsByteArrayString": result2,
    "ImmediatelyApply": false,
    "OverwriteExisting": true
  }
  // Need to send data to misty PATH

  const sendAudioToMisty = await writeAudioMisty(result2)
  const playAudioClip = await playAudio()
  // console.log("this is result 1", result1, "this is result2", result2);
  // console.log("This is the payload sent", payload);
  return res.status(200).json(payload)
  // .then((byte)=>{
  //   console.log(byte, "this is the byte");
  //   return res.status(200).json(payload)
  // })
})

module.exports = router
