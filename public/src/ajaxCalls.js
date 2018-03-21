console.log("Congradulations you have made it to the home.js file!");
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/watson/receive",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Accept": "audio/wav",
    "Authorization": "Basic ZThiM2QwMjQtOGUyMC00YjU4LTg5MzQtZWZiZGI1NDk2MzIyOmdzeDI4R3FpWG1SSQ==",
    "Cache-Control": "no-cache"
  },
  "processData": false,
  "data": "{\n\t\"text\": \"Whats going on Brother!\"\n}"
}

$.ajax(settings).done(function (data) {
  console.log(data.DataAsByteArrayString);
  let byteString = JSON.stringify(data.DataAsByteArrayString)
  console.log(byteString);
  var settings2 = {
    "async": true,
    "crossDomain": true,
    "url": "http://10.0.1.3/Api/SaveAudioAssetToRobot",
    "method": "POST",
    "headers": {
      "content-type": "text/plain"
    },
    "data": JSON.stringify({
      "FilenameWithoutPath": "textResponse.wav",
      "DataAsByteArrayString": `${data.DataAsByteArrayString}`,
      "ImmediatelyApply": "false",
      "OverwriteExisting": "true"
    })
  }
  console.log(data);
  $.ajax(settings2).done(function(response2) {
    console.log(response2);
    var settings3 = {
      "async": true,
      "crossDomain": true,
      "url": "http://10.0.1.3/Api/PlayAudioClip",
      "method": "POST",
      "headers": {
      },
      "processData": false,
      "data": "{\n  \"AssetId\":\"textResponse.wav\"\n}"
    }

    $.ajax(settings3).done(function (response) {
      console.log(response);
    });
  });
})
