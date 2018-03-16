// need
// test data
let first_name = ""
let last_name = ""
let phone_number = "+123456789"

// let userSender= document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');


const newOutbound = (first_name, last_name, phone_number, message) => {
  console.log(`first_name: ${first_name}, last_name: ${last_name}, phone_number: ${phone_number}, message is : ${message}`)
  // use first and last name entered if available
  if(first_name.length > 0 || last_name.length > 0){
    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1)
    last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1)

        let outMessage = `<p><strong> ${first_name} ${last_name}: </strong> ${message}</p>`

    $("#chat-window").prepend(outMessage)
    // output
    $("#message").val('')
  }

// use phone number as identifier name if no first or last is available
  else if (phone_number){
    let newArr = []
    newArr = phone_number.split("")
    console.log(phone_number, newArr)
    newArr.shift()
    phone_number = newArr.join('')
    let outMessage = `<p><strong> ${phone_number}: </strong> ${message}</p>`

$("#chat-window").prepend(outMessage)

// output
$("#message").val('')
}

// return "wow"
// (`<div class="messageOut row center"><div class="col s2 m2 l2"><`)
//}
return "dang"
}




const direct_talks_listeners = () => {
$("#sendBtn").click(() => {
  message = $("#message").val()
  newOutbound(first_name, last_name, phone_number, message);
  // works
})

// works
$("#clearBtn").click(() => {
  $("#message").val('')
})
}

// Does not work
// $("#clearAllBtn").click(() => {
//   $("#output").val('')
// })


$(document).ready(() => {
  direct_talks_listeners()
  })
  /*
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
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true,
    // onOpen: function(el) {}
    // onClose: function(el) {}
  })
  */
