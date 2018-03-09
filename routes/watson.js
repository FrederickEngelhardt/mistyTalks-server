const express = require("express")
const router = express.Router();
const env = require("dotenv").config()
// Watson API references
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');

const text_to_speech = new TextToSpeechV1({
  username: process.env.USERNAME,
  password: process.env.PASSWORD
});

function writeFile(text, voice) {
  // Params are the defaults of information requested from watson API
  let params = {
    text: 'No text was sent.',
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  }
// Check to see if writeFile has new information
// Updates params if the values are present
  if (text) params["text"] = text;
  if (voice) params["voice"] = voice;

  return new Promise((resolve, reject) => {
    // Creation of file using watson's node_module and calling their function synthesize
    const writable = fs.createWriteStream('textResponse.wav')
    text_to_speech.synthesize(params).on('error', function(error) {
      console.log('Error:', error);
    }).pipe(writable)
    // Add listeners to writable so that the promise is not resolved until writable finishes
    writable
      .on('error', (err) => reject(err)) // NOTE: potential breakage here for making this function 1 line :)
      .on('finish', resolve("success")) // check for promise to resolve with file
  })
}

function read() {
  return new Promise((resolve, reject) => {
    const path = './textResponse.wav'
    // file is a ArrayBuffer
    let file = fs.readFileSync(path)

    // Using global Buffer class in node.js we instantiate a new buffer class using the ArrayBuffer from file.
    var b = new Buffer(file)

    // ab refers to the undlying ArrayBuffer created with b.
    var ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);

    // Turns the buffer in unsigned integer 8 array string
    var ui8 = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT).toString()

    // Resolves the promise and returns the ui8 string
    return resolve(ui8)
  })
}

function writeAudioMisty(byteStreamArray) {
  /*
    byteStreamArray to be sent to misty and written as a file on the misty robot.
    TODO: let user rename the file so they can make custom calls.
    NOTE: textResponse.wav is the file name that misty creates on her localStorage
  */
  return new Promise((resolve, reject) => {
    const unirest = require("unirest");

    const req = unirest("POST", "http://192.168.1.129/Api/SaveAudioAssetToRobot");

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
  /*
    NOTE: This function calls the specified filename and plays it through misty robot
          *if the robot does not play the file, it may not exist
          **OR playAudio cut off the previous call.
          TODO: Add chaining playing audio files for misty robot...
  */
  return new Promise((resolve, reject) => {
    var unirest = require("unirest");

    var req = unirest("POST", "http://192.168.1.129/Api/PlayAudioClip");

    req.headers({
      "Cache-Control": "no-cache"
    });

    // AssetId key refers to the filename that will be played.
    req.send("{\n  \"AssetId\":\"textResponse.wav\",\n}");

    req.end(function(res) {
      if (res.error) throw new Error(res.error);
      else {
        console.log("promise resolved");
        resolve("success")
      }
    });
  })
}

router.post('/watson/receive', async function(req, res, next) {
  /*
    NOTE: 1. ASYNC function to await for writeFile, read, writeAudioToMisty, playAudio functions
          2. After await completes send back a success response
    TODO: Add error handling for each function that does NOT break server with throw.
  */
  const result1 = await writeFile(req.body.text)
  const result2 = await read()
  const sendAudioToMisty = await writeAudioMisty(result2)
  const playAudioClip = await playAudio()

  return res.status(200).send("Success")
})

module.exports = router
