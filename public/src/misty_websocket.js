// Make Connection

// second variable called socket...will not cross to the server...
// on refresh will listen for requests
let socket = io.connect('http://localhost:3500');

// Query DOM based off front end...
// let message = document.getElementById('message');


// Emit EVENTS
  // - adding event listener

// btn.addEventListener('click', function () {
//   socket.emit('chat', {
//    message: message.value,
//    handle: handle.value
//   })
// });
// message.addEventListener('keypress', function(){
//   // emit that someone is typing, we want to send a message that someone is typing and the second param is the value of the handle of the person typing...
//   socket.emit('typing', handle.value);
// })

// Listen for EVENTS


// socket.on('chat', function (data){
//   feedback.innerHTML = '';
//   output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>'
// })
// socket.on('typing', function (data){
//   feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
// })
