function createLoginListener(){
  // Creating the listener for the login button on the index.html

$('#login-btn').on('click', (event) => {
   event.preventDefault()
   const email = $('.email-login-input-text').val()
   const password = $('.password-login-input-text').val()


   const options = {
     contentType: 'application/json',
     data: JSON.stringify({ email, password }),
     dataType: 'json',
     type: 'POST',
     url: '/users/token'
   };
   $.ajax(options)
     .done(() => {
       window.location.href = '/home.html'
     })
     .fail($xhr => {
       Materialize.toast($xhr.responseText, 3000)
     })
 })
}

$(document).ready(() => {
createLoginListener();

  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    // ready: function(modal, trigger) {
    // },
    // complete: function() {}
  })
})
