// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "http://localhost:3000/speak",
//   "method": "POST",
//   "headers": {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Authorization": "Basic ZnJlMTk5NEBnbWFpbC5jb206VGVzdGVyQDQwNA==",
//     "Cache-Control": "no-cache"
//   },
//   "data": {
//     "text": "Alexa! Stop playing music!"
//   }
// }
// $.ajax(settings).done(function(data) {
//   // console.log(data.DataAsByteArrayString);
//   let byteString = JSON.stringify(data.DataAsByteArrayString)
//   console.log(byteString);
//   var settings2 = {
//     "async": true,
//     "crossDomain": true,
//     "url": "http://192.168.1.129/Api/SaveAudioAssetToRobot",
//     "method": "POST",
//     "headers": {
//       "content-type": "text/plain"
//     },
//     "data": JSON.stringify({
//       "FilenameWithoutPath": "textResponse.wav",
//       "DataAsByteArrayString": `${data.DataAsByteArrayString}`,
//       "ImmediatelyApply": "false",
//       "OverwriteExisting": "true"
//     })
//   }
//   console.log(data);
//   $.ajax(settings2).done(function(response2) {
//     console.log(response2);
//     var settings3 = {
//       "async": true,
//       "crossDomain": true,
//       "url": "http://192.168.1.129/Api/PlayAudioClip",
//       "method": "POST",
//       "headers": {
//         "Content-Type": "application/json",
//         "Cache-Control": "no-cache"
//       },
//       "processData": false,
//       "data": "{\n  \"AssetId\":\"textResponse.wav\"\n}"
//     }
//
//     $.ajax(settings3).done(function(response3) {
//       console.log(response3);
//     });
//   });
// })
