/*
  BEGGINING OF FORM SUBMISSION FUNCTIONS
*/
const add_number = (count) => {

  return (`<div class="deleteNumberFields${count} row center">
            <div class="col s2 m2 l2">
              <input type="tel" id="phone_country_code${count}" name="country_code" value="+1" placeholder="country" required>
            </div>
            <div class="col s7 m7 l7">
              <input type="tel" id="phone_number${count}" name="phone_number" value="" placeholder="XXX-XXX-XXXX" required>
            </div>
            <div class="col s2 m2 l2">
              <a id="add_number" style="background-color:  red" class="removeNumber${count} modal-trigger btn-floating btn-small waves-effect waves-light">
              <i class="material-icons">remove</i>
            </a>
            </div>
          </div>`)
}

const voices = [{
    "name": "es-LA_SofiaVoice",
  },
  {
    "name": "pt-BR_IsabelaVoice",
  },
  {
    "name": "en-GB_KateVoice",
  },
  {
    "name": "de-DE_BirgitVoice",
  },
  {
    "name": "en-US_AllisonVoice",
  },
  {
    "name": "fr-FR_ReneeVoice",
  },
  {
    "name": "it-IT_FrancescaVoice",
  },
  {
    "name": "es-ES_LauraVoice",
  },
  {
    "name": "ja-JP_EmiVoice",
  },
  {
    "name": "es-ES_EnriqueVoice",
  },
  {
    "name": "de-DE_DieterVoice",
  },
  {
    "name": "en-US_LisaVoice",
  },
  {
    "name": "en-US_MichaelVoice",
  },
  {
    "name": "es-US_SofiaVoice",
  }
]
const add_all_voices = () => {
  for (let i in voices) {
    let html = `<option value="${i}">${voices[i].name}</option>`
    $(`#choose_voices`).append(html)
  }
}

/*
    Defaults the number count to be 1.
    We use this variable to count the number of added phones in an array
*/
let added_number_count = 1


console.log("loaded home.js");

const create_listeners = () => {
  $("#button_my_account").on("click", () => {
    $(".display_home").addClass("hide_this")
    $()
  })

  /*
    addNumber lets you add multiple numbers to the form.
  */
  $(".addNumber").click(() => {
    added_number_count++
    $('#add_phone_number_location').append(add_number(added_number_count))
    $(`.removeNumber${added_number_count}`).on("click", () => {
      console.log('clicked');
      $(`.deleteNumberFields${added_number_count}`).remove()
      added_number_count--
      console.log(added_number_count);
    })
  })
  // end of addNumber
}

const retrieveSubmitFormData = (event) => {
  event.preventDefault()

  /*Iterate through form information. The store inside a JSON object*/
  let data = new Object()
  let form_ids = ["preference_name", "robot_name", "ip_address", "port_number"]
  for (let key in form_ids) {
    data[form_ids[key]] = $(`#${form_ids[key]}`).val()
  }
  // console.log("data", data);
  data.auth_number_string = ''
  // console.log(data);
  for (let i = 1; i <= added_number_count; i++) {
    let cc = $(`#phone_country_code${i}`).val()
    console.log(cc);
    let phone_number = $(`#phone_number${i}`).val()
    console.log(phone_number);
    data['auth_number_string'] += cc + phone_number
  }
  // Missing phone numeber iteration
}
const sendSubmitForm = (data) => {}
/*
  END OF FORM SUBMISION FUNCTIONS
*/
const getAllImagesMisty = () => {
  // return new Promise((resolve) => {
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://192.168.1.129/Api/GetListOfImages",
      "method": "GET",
      "headers": {
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response[0].result)
      let array = response[0].result
      for (let i in array) {
        console.log(array[i].name);
        let html = `<option value="${i}">${array[i].name}</option>`
        console.log(html);
        $('#choose_face_image').append(html)
        return resolve(response)
      }
    });
  // })
}
function test (data) {
  $(`#choose_face_image`).append(`<option value="${data}" disabled selected>Choose Misty Face</option>`)
}
$.ajax({
  url: `http://192.168.1.129/Api/GetListOfImages`,
  method: "GET",
  success: function(data) {
    console.log(data);
    $('#choose_face_image').append(`<option value="" disabled selected>Choose Misty Face</option>`);
  }
});
$(document).ready(() => {
  // $(".container").css("display", "none")
  add_all_voices()
  create_listeners();
  /*
    Materialize functions
  */
  $('.timepicker').pickatime({
  default: 'now', // Set default time: 'now', '1:30AM', '16:30'
  fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
  twelvehour: false, // Use AM/PM or 24-hour format
  donetext: 'OK', // text for done-button
  cleartext: 'Clear', // text for clear-button
  canceltext: 'Cancel', // Text for cancel-button
  autoclose: false, // automatic close timepicker
  ampmclickable: true, // make AM PM clickable
  aftershow: function(){} //Function for after opening timepicker
});
  $('select').material_select();
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
  /*
    End of Materialize functions
  */
})
