//
// // test data
let first_name = 'Leroy',
  last_name = 'Jenkins',
  phone_number = '+12345678',
  robot_name = 'misty'
//
// const newOutbound = (
//   first_name,
//   last_name,
//   phone_number,
//   message,
//   robot_name
// ) => {
//   console.log(
//     `first_name: ${first_name}, last_name: ${last_name}, phone_number: ${phone_number}, message is : ${message}`,
//     'robot_name:',
//     robot_name
//   )
//   // use first and last name entered if available
//   console.log(robot_name.length)
//
//   if (robot_name.length > 0) {
//     robot_name = robot_name.charAt(0).toUpperCase() + robot_name.slice(1)
//     console.log(robot_name, 1)
//     // first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1)
//     // last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1)
//     console.log('in here')
//
//     if (message.length > 0) {
//       console.log('in message length here')
//       let outName = `<div class="chatName"><strong> ${robot_name}</strong></div><p class="chatSubj">${message}</p>`
//       //  $(".chatName").prepend(outName)
//       // $(".chatSubj").prepend(outMessage)
//       $('.chatOut').append(`${outName}`)
//       // output
//       $('#message').val('')
//     }
//   } else if (phone_number) {
//     // use phone number as identifier name if no first or last is available
//     let newArr = []
//     newArr = phone_number.split('')
//     console.log(phone_number, newArr)
//     newArr.shift()
//     phone_number = newArr.join('')
//     if (message.length > 0) {
//       let outName = `<div class="chatName"><strong> ${phone_number}</strong></div>`
//       let outMessage = `<p class="chatSubj">${message}</p>`
//       $('.chatOut').append(outName, outMessage)
//       // output
//       $('#message').val('')
//     }
//   }
//   return 'dang'
// }
//
// const message_listener = () => {
//   $('#sendMessBtn').click(event => {
//     message = $('#message').val()
//     newOutbound(first_name, last_name, phone_number, message, robot_name)
//     console.log(message, robot_name, 'in DTL')
//     event.preventDefault()
//     console.log(message, 'in DTL #2')
//     // works
//   })
// }
//
// ////////////////////////////////////////////////
// $(document).ready(() => {
//   message_listener()
// })
// ////////////////////////////////////////////////
