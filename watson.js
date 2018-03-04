const express = require("express")
const router = express.Router();
const env = require("dotenv").config()
const FileReader = require('filereader')
// Watson API references
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');
const converter = require('convert-string')
// const txt = require('unit8array-loader')

const text_to_speech = new TextToSpeechV1({
  username: process.env.USERNAME,
  password: process.env.PASSWORD
});


function read() {
  // let byteArrayFile
  const path = './textResponse.wav'
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      var b = new Buffer(data);
      // ArrayBuffer
      var ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
      // TypedArray
      var ui8 = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT)
      console.log(ui8);
      resolve('ui8')
    })
    console.log(ui8);
    fs.writeFile("test", ui8, function(err) {
      if (err) {
        console.log(err);
      }
      console.log("The file was saved!");
    });
  })

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
}
async function awaitRead() {
  var result = await(read)
  console.log(result)
  return result
}
// read()
console.log(awaitRead())
// console.log(readFile().then(function(data){
//   console.log(data);
// }));
// readFile()
// console.log(readFile());
// async function writeFile(req) {
//   params["text"] = req.body.text;
//   let file = text_to_speech.synthesize(params).on('error', function(error) {
//     console.log('Error:', error);
//   }).pipe(fs.createWriteStream('textResponse.wav'))
// }

async function writeFile(text) {
  let params = {
    text: 'No text was sent.',
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  }
  if (text.length > 0) params["text"] = text;

  let promise = new Promise(function(resolve, reject) {
    let file = text_to_speech.synthesize(params).on('error', function(error) {
      console.log('Error:', error);
    }).pipe(fs.createWriteStream('textResponse.wav'))
    return resolve('File has been written.')
  })
  let result = await promise
  return result
}
// writeFile('Hello')

router.post('/speak', (req, res, next) => {
  console.log('speak api called');
  writeFile(req.body.text).then(function(data) {
    console.log('Writefile', data);
    let result = awaitRead()
    return res.status(200).json(result)
  })
  // readFile().then(function(data){
  //   let payload = {
  //     "FilenameWithoutPath": "textResponse.wav",
  //     "DataAsByteArrayString": data,
  //     "ImmediatelyApply": false,
  //     "OverwriteExisting": true
  //   }
  // })
  // byteArrayFile = readFile();
  // console.log(byteArrayFile);
})

module.exports = router;
