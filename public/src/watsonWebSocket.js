var voice = "en-US_AllisonVoice";
// var format = 'audio/ogg;codecs=opus';
var format = 'audio/wav';
var token = `xZWasUs4J2OWvZLd542F6%2FWQmS8pfiQ93oWZvPw%2FoLrBvn4jkrsVhH%2BVTyVVtFen%2FuPTVk7pkM9nAJb8WIbc5A8TcuaIovnU6qJNgcF%2B4xZVWrBXGbl%2BUpZ3gJLAAsEHR04dlAlC2pnQZjtuO41A5Oo9IOEpyRZ0RlnglFzPKTt28UBKMaJuMDLk%2B34dF5vZfPMkciU3SPptyqNptFFumds0z4MAgphb8t3OhyIaXXLp%2BJQd6gVNwHfE%2Bk7Qye%2FyMk%2BOvx8HywYyIouFWBvI1ws42GILp9qtmUe488IEcu2%2Fe2BPmPbk1zupC%2Fnak4yzpl9jI4Kcuj%2BZN3wgnumWoK6ip%2FzgfyJxYfNgIYMQBcr%2Bsc%2Fg3dDRAC9AvD0CoDUZ45JPt6joP0stXJUNBGPpF0fg8d%2BNLOnxt9tDe8mvof47cvz0FyAUhch9RVKxZLjGUhNhX%2FgBDHrgmraf6OvdePx9hBU2l2MQFszfTLRpMZYhm3zq0PrQt9Y9%2FBNVeIDImG%2BkH1z9TW5Iek%2F1RdMqcm8nXOPQRJF63CuCPzQxCGZVQSfcH72%2BAhAXabjfwuXqlP5vMqq0S5ATCA51%2B9ZRRYLnyz1eHP9KXFtHIdsDOp8u8VGwHHwNPU139o8J0FXsuuh4EVIz4OZLVy1mpSRinSjkB%2FC%2BRjSG5usz0%2BT0qMBnqiVv%2FUp6vKzSH9SVWYspv%2B1OyVpeiW04%2FyxhS%2B3sD979xW%2FZU%2FDylF0ZbGA%2B6UOw61GoHSxVZzKA1Yn31GAv6i1i4cCbzuys1q8xY%2FYPMazmsWnxFWLuX%2F2r2Xm5o1Y228RSaid2XD6krGmQW7RDArqTGc%2F13gAyjLJNhr4DP8%2FsUAzYuwLYlU9nSunrZJghytw2I36ewLDXyU3Vz%2FpDU9FegQ3SJx3FZ3TUjWUGyuhjFJsy1qwQ0RjeFzhakP3318RyGiArwnwj2uwYIBr9HXYoJrqFddfq7yLvUK%2F6QzsS7ZruKeCQ`;
var wsURI = "wss://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?voice=" +
  voice + "&watson-token=" + token;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/watson/token",
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache"
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

function onOpen(evt) {
  var message = {
    text: "Hello world",
    accept: format
  };
  // The service currently accepts a single message per WebSocket connection.
  websocket.send(JSON.stringify(message));
}

var audioParts = [];
var finalAudio;

function onMessage(evt) {
  if (typeof evt.data === 'string') {
    console.log('Received string message: ', evt.data)
  } else {
    console.log('Received ' + evt.data.size + ' binary bytes', evt.data.type);
    audioParts.push(evt.data);
  }
}

function onClose(evt) {
  console.log('WebSocket closed', evt.code, evt.reason);
  finalAudio = new Blob(audioParts, {
    type: format
  });
  console.log('final audio: ', finalAudio);
  // Create a new file reader
  let fileReader = new FileReader();
  fileReader.readAsArrayBuffer(finalAudio)
  fileReader.onload = function(event) {
    let byteArray = new Uint8Array(fileReader.result);
    let FileName = finalAudio.name;
    let dataAsByteArrayString = byteArray.toString();
    console.log(dataAsByteArrayString);
  }
}

function onError(evt) {
  console.log('WebSocket error', evt);
}

var websocket = new WebSocket(wsURI);
websocket.onopen = onOpen;
websocket.onclose = onClose;
websocket.onmessage = onMessage;
websocket.onerror = onError;
