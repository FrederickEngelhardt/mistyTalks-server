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
  // let byteArrayFile
  return new Promise((resolve, reject) => {
    const path = './textResponse.wav'
    // fs.readFile(path, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     var b = new Buffer(data);
    //     // ArrayBuffer
    //     var ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
    //     // TypedArray
    //     var ui8 = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT).toString()
    //     // console.log(ui8);
    //   }
    // })
    let file = fs.readFileSync(path)
      var b = new Buffer(file);
      // ArrayBuffer
      var ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      // TypedArray
      var ui8 = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT).toString()
      // console.log(ui8);
      return resolve(ui8)
  })
  // .then(function(results) {
  //   console.log("results here: " + results)
  //   return results
  // }).catch(function(err) {
  //   console.log("error here: " + err);
  // });
}
// read()
// let promise = new Promise((resolve, reject) => {
//   fs.readFile('./textResponse.wav', 'utf8', (err, data) => {
//     if (err) throw (err);
//     byteArrayFile = converter.UTF8.stringToBytes(data)
//   })
// });
// let result = await promise
// console.log(result, 'this is result');
// return result
// return ui8
// async function awaitRead() {
//   let promise = new Promise(function(resolve, reject) {
//     const path = './textResponse.wav'
//     fs.readFile(path, (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       var b = new Buffer(data);
//       // ArrayBuffer
//       var ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
//       // TypedArray
//       var ui8 = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT).toString()
//       console.log(ui8);
//       return resolve(ui8)
//     })
//   })
//   var result = await promise
//   console.log(result);
//   return result
// }



async function writeFile(text) {
  let params = {
    text: 'No text was sent.',
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  }
  if (text.length > 0) params["text"] = text;

  return new Promise(function(resolve, reject) {
    let file = text_to_speech.synthesize(params).on('error', function(error) {
      console.log('Error:', error);
    }).pipe(fs.createWriteStream('textResponse.wav'))
    return resolve('success')
  })
}

router.post('/speak', async function(req, res, next) {
  console.log('speak api called');
  const [result1, result2] = await Promise.all([read(),writeFile(req.body.text)])
  let payload = {
    "FilenameWithoutPath": "textResponse.wav",
    "DataAsByteArrayString": result1,
    "ImmediatelyApply": false,
    "OverwriteExisting": true
  }
  // console.log("this is result 1", result1, "this is result2", result2);
  console.log("This is the payload sent", payload);
  return res.status(200).json(payload)
  // .then((byte)=>{
  //   console.log(byte, "this is the byte");
  //   return res.status(200).json(payload)
  // })
})

module.exports = router;
