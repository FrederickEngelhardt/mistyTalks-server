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

  return new Promise((resolve) => {
    // Creation of file using watson's node_module and calling their function synthesize
    const writable = fs.createWriteStream('./audio/textResponse.wav')
    text_to_speech.synthesize(params).on('error', function(error) {
      console.log('Error:', error);
    }).pipe(writable)

    // Waits till writable completes
    writable.on('error', (err) => {
      (err)
    }).on('finish', function() {
      resolve("success")
    })
  })
}

function read() {
  return new Promise((resolve, reject) => {
    const path = './audio/textResponse.wav'
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

function writeAudioMisty(byteStreamArray, ip_address) {
  /*
    byteStreamArray to be sent to misty and written as a file on the misty robot.
    TODO: let user rename the file so they can make custom calls.
    NOTE: textResponse.wav is the file name that misty creates on her localStorage
  */
  // error handling
  let filename = 'textResponse.wav'
  if (!byteStreamArray) console.log('ByteStreamArray not sent')
  return new Promise((resolve, reject) => {
    const unirest = require("unirest");

    const req = unirest("POST", `http://${ip_address}/Api/SaveAudioAssetToRobot`);

    req.headers({
      "Cache-Control": "no-cache"
    });

    req.send(JSON.stringify({
      "FilenameWithoutPath": `${filename}`,
      "DataAsByteArrayString": `${byteStreamArray}`,
      "ImmediatelyApply": "false",
      "OverwriteExisting": "true"
    }));

    req.end(function(res) {
      if (res.error) console.log(res.error);
      else {
        resolve("resolved")
      }
    });
  })
}

function playAudio(ip_address) {
  /*
  NOTE: This function calls the specified filename and plays it through misty robot
        *if the robot does not play the file, it may not exist
        **OR playAudio cut off the previous call.
        TODO: Add chaining playing audio files for misty robot...
*/
  let misty_filename = "textResponse.wav"
  return new Promise((resolve, reject) => {
    var unirest = require("unirest");

    var req = unirest("POST", `http://${ip_address}/Api/PlayAudioClip`);

    req.headers({
      "Cache-Control": "no-cache"
    });
    // AssetId key refers to the filename that will be played.
    req.send(JSON.stringify({
      "AssetId": `${misty_filename}`
    }));

    req.end(function(res) {
      if (res.error) console.log(res.error);
      else {
        resolve('audioPlayed')
      }
    });
  })
}
// playAudio("Im-Mr-Meeseeks-look-at-me.wav")


function getWatsonToken() {
  /*NOTE: Use this function to get a user token for watson WebSocket calls*/
  return new Promise((resolve) => {
    var request = require("request");

    var options = {
      method: 'GET',
      url: 'https://stream.watsonplatform.net/authorization/api/v1/token',
      qs: {
        url: 'https://stream.watsonplatform.net/text-to-speech/api'
      },
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: process.env.WATSON_BASIC_TOKEN_AUTH
      }
    };

    request(options, function(error, response, body) {
      if (error) console.log(error);
      console.log(body);
      return resolve(body)
    });
  })
}

function mistyGetInfo(ip_address) {
  return new Promise((resolve) => {
    var request = require("request");
    request.get(`http://${ip_address}/api/info/devices`, {timeout: 1500}, function(error, response, body) {
      console.log(error);
      if (error) {
        let message = {
          status: 404,
          message: "Your misty is not connected properly."
        }
        return message
      }
      console.log(body, response, "Made it");
      return resolve({status: 200, message: "success", data: body})
    });
  })
}
router.get("/watson/token", async function(req, res, next) {
  const get_token = await getWatsonToken()
  res.status(200).send(get_token)
})

router.post('/watson/receive', async function(req, res, next) {
  console.log(req.body.text, req.body.voice, req.body.ip_address);
  /*
  NOTE: ip_address is supposed to be the ip_address from misty user preferences.
  If the ip address is not working, manually change the ip_address to misty_robot given ip address.
*/
  let voice = 'en-US_AllisonVoice',
    text = '',
    ip_address = '192.168.1.129'
  if (req.body.text) text = req.body.text
  if (!req.body.text) next({
    status: 400,
    message: `No text sent.`
  })
  if (req.body.voice) voice = req.body.voice
  if (req.body.ip_address) ip_address = req.body.ip_address

  // NOTE: Test function to check if misty is working before you waste Watson API for a failed post.
  const verify_misty_functions = await mistyGetInfo(ip_address)

  const write_file = await writeFile(req.body.text, voice)
  const read_file = await read()
  const write_audio_misty = await writeAudioMisty(read_file, ip_address)
  const play_audio = await playAudio(ip_address)
  return res.status(200).json({
    status: "success",
    message: `${req.body.text}`
  })
})

module.exports = router
