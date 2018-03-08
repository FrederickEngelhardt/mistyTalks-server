console.log("Congradulations you have made it to the home.js file!");
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/speak",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Accept": "audio/wav",
    "Authorization": "Basic ZThiM2QwMjQtOGUyMC00YjU4LTg5MzQtZWZiZGI1NDk2MzIyOmdzeDI4R3FpWG1SSQ==",
    "Cache-Control": "no-cache"
  },
  "processData": false,
  "data": "{\n\t\"text\": \"hello\"\n}"
}

$.ajax(settings).done(function (data) {
  console.log(data.DataAsByteArrayString);
  let byteString = JSON.stringify(data.DataAsByteArrayString)
  console.log(byteString);
  var settings2 = {
    "async": true,
    "crossDomain": true,
    "url": "http://192.168.1.129/Api/SaveAudioAssetToRobot",
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
      "url": "http://192.168.1.129/Api/PlayAudioClip",
      "method": "POST",
      "headers": {
        "Access-Control-Allow-Origin": '*',
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      "processData": false,
      "data": "{\n  \"AssetId\":\"textResponse.wav\"\n}"
    }

    $.ajax(settings3).done(function (response) {
      console.log(response);
    });
  });
})



var data = "{\n  \"AssetId\":\"textResponse.wav\"\n}";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://192.168.1.129/Api/PlayAudioClip");
xhr.setRequestHeader("Access-Control-Request-Headers", "*");
xhr.setRequestHeader("Cache-Control", "no-cache");

xhr.send(data);
