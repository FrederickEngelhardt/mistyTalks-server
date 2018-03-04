'use strict'
const express = require("express")
const router = express.Router();
const env = require("dotenv").config()
const FileReader = require('filereader')
// Watson API references
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const fs = require('fs');
const converter = require('convert-string')

const text_to_speech = new TextToSpeechV1({
  username: process.env.USERNAME,
  password: process.env.PASSWORD
});

// function readFile() {
//   let byteArrayFile
//   let reader = new FileReader();
//   // reader.readAsArrayBuffer(textResponse.wav);
//   console.log(reader.result);
//   fs.readFile('./textResponse.wav', 'utf8', (err, data) => {
//     // console.log(data);
//     if (err) throw err
//     reader.readAsArrayBuffer(data)
//     reader.onload = function (event) {
//       let byteArray = new Uint8Array(reader.result)
//       let fileName = data.name
//     }
//   })
//
//   // let promise = new Promise((resolve, reject) => {
//   //   let reader = new FileReader();
//   //   reader.readAsArrayBuffer("textResponse.wav")
//   //   let byteArray = new Uint8Array(reader.result)
//   //   console.log(reader.result);
//   //   // console.log(byteArray);
//   //   resolve(byteArray.toString())
//   //   // fs.readFile('./textResponse.wav', 'utf8', (err, data) => {
//   //   //   console.log(data);
//   //   //   if (err) throw (err);
//   //   //   byteArrayFile = converter.UTF8.stringToBytes(data)
//   //   //   fs.writeFile("test", byteArrayFile, function(err) {
//   //   //     if (err) {
//   //   //       return console.log(err);
//   //   //     }
//   //   //     console.log("The file was saved!");
//   //   //     return resolve(byteArrayFile)
//   //   //   });
//   //   // })
//   // });
//   // let result = await promise
//   // console.log(result, 'this is result');
//   // return result
// }
// readFile()
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
    resolve('File has been written.')
  })
}
// writeFile('Hello')

router.post('/speak', (req, res, next) => {
  console.log('working');
  writeFile(req.body.text)
  // readFile().then(function(data){
  //   let payload = {
  //     "FilenameWithoutPath": "textResponse.wav",
  //     "DataAsByteArrayString": data,
  //     "ImmediatelyApply": false,
  //     "OverwriteExisting": true
  //   }
  return res.status(200).json('success')
  // })
  // byteArrayFile = readFile();
  // console.log(byteArrayFile);
})

module.exports = router;
