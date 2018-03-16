/*
  BEGGINING OF FORM SUBMISSION FUNCTIONS
*/
class State {
  constructor(current_page) {
    this.current_page = current_page
  }
}
let homeState = new State('home')
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

// Array of all watson voices
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

// HTML code to add all voices into the selection zone
const add_all_voices = () => {
  for (let i in voices) {
    let html = `<option value="${i}">${voices[i].name}</option>`
    $(`#choose_voices`).append(html)
  }
}

/*
    We use this variable to count the number of added phones in an array
*/
let added_number_count = 1


console.log("loaded home.js");

const remove_all_divs = () => {
  $(`.card_container`).remove()
}


const create_listeners = () => {
  // **** MAIN HOME PAGE LISTENERS ****
  /*
    Edit/View Account information
  */
  $(".go_to_home").on("click", () => {
    if (homeState.current_page !== "home"){
      remove_all_divs()
      $(".display_home").removeClass("hide_this")
      homeState.current_page = "home"
    }
  })
  $(".go_to_my_account").on("click", () => {
    $(".display_home").addClass("hide_this")
    const html = `  <div class="card_container">
        <div class="profile_card white">
          <h4 class="title_box">Account Information</h4>
          <form id="edit_card_body">

            <!--First Name-->
            <h5>First Name:</h5>
            <div class="row center">
              <div class="col s9 m9 l9">
                <input type="text" id="first_name" name="first" value="" placeholder="First Name" required>
              </div>
            </div>
            <!--End First Name-->

            <!-- Last Name -->
            <h5>Last Name:</h5>
            <div class="row center">
              <div class="col s9 m9 l9">
                <input type="text" id="last_name" name="last" value="" placeholder="Last Name" required>
              </div>
            </div>
            <!-- End Last Name -->

            <!--user email -->
            <h5>Email:</h5>
            <div class="row center">
              <div class="col s9 m9 l9">
                <input type="email" id="email" name="email" value="" placeholder="email@mistytalks.com" required>
              </div>
            </div>
            <!-- end of user email  -->

            <!--user email -->
            <h5>New Password:</h5>
            <div class="row">
              <div class="col s9 m9 l9">
                <input type="password" id="password" name="email" value="" placeholder="password" required>
                <input type="password" id="confirm_password" name="email" value="" placeholder="confirm password" required>
              </div>
            </div>
            <!-- end of user email  -->

            <!-- Form submit/exit buttons here.  -->
            <div class="row center">
              <button type="submit" class="btn waves-effect waves-light" id="saveButton">Save</button>
              <button id="cancelButton" class="btn waves-effect waves-light" type="submit" name="action">Cancel</button>
            </div>
          </form>




        </div>
      </div>`
    if (homeState.current_page !== "my_account") {
      remove_all_divs()
      $(".container").append(html)
    }
    homeState.current_page = "my_account"
  })
  /*
    End of Edit/View Account
  */

  $('.go_to_misty_preferences').on("click", () => {
    $(".display_home").addClass("hide_this")
    const html = `
    <div class="card_container">
      <div class="profile_card white">

    <form id="edit_card_body" onsubmit="return retrieveSubmitFormData(event);">
      <h4 class="title_box">Misty Preferences</h4>
      <!--First Name-->
      <h5>Preference Name:</h5>
      <div class="row center">
        <div class="col s9 m9 l9">
          <input type="text" id="preference_name" name="preference_name" value="" placeholder="Preference Name" required>
        </div>
      </div>
      <!--End First Name-->

      <!-- Last Name -->
      <h5>Robot Name:</h5>
      <div class="row center">
        <div class="col s9 m9 l9">
          <input type="text" id="robot_name" name="robot_name" value="" placeholder="Robot Name" required>
        </div>
      </div>
      <!-- End Last Name -->

      <!--user email -->
      <h5>IP Address:</h5>
      <div class="row center">
        <div class="col s9 m9 l9">
          <input type="text" id="ip_address" name="ip_address" value="" placeholder="192.168.1.129" required>
        </div>
      </div>
      <!-- end of user email  -->

      <!--user email -->
      <h5>Port Number(if applicable):</h5>
      <div class="row">
        <div class="col s9 m9 l9">
          <input type="text" id="port_number" name="port_number" placeholder="Only add if assigned.">
        </div>
      </div>
      <!-- end of user email  -->

      <!--Authorize numbers input here -->
      <div id="add_phone_number_location">
        <h5>Authorized Phone Numbers:</h5>
        <div class="row center">
          <div class="col s2 m2 l2">
            <input type="tel" id="phone_country_code1" name="country_code" value="+1" placeholder="+1" required>
          </div>
          <div class="col s7 m7 l7">
            <input type="tel" id="phone_number1" name="phone" value="" placeholder="XXX-XXX-XXXX">
          </div>
          <div class="col s2 m2 l2">
            <a style="background-color:  green" class="addNumber modal-trigger btn-floating btn-small waves-effect waves-light">
            <i class="material-icons">add</i>
          </a>
          </div>
        </div>
      </div>
      <!-- End authorization numbers -->

      <!--misty voice settings -->
      <h5>Misty Voice</h5>
      <div class="row">
        <div class="input-field col browser-default s9 m9 l9">
          <select id="choose_voices">
              <option value="" disabled selected>Choose your misty Voice</option>
            </select>
        </div>
      </div>
      <!-- end of misty voice settings-->

      <!--misty face settings -->
      <h5>Misty Robot Face</h5>
      <div class="row">
        <div class="input-field col browser-default s9 m9 l9">
          <p class="small-text col s6 m6 l6">Valence:</p>
          <input class="col s3 m3 l3" type="text" id="expression_valence" name="expression_valence" placeholder="0.0 - 1.0">
          <p class="small-text col s6 m6 l6">Arousal:</p>
          <input class="col s3 m3 l3" type="text" id="expression_arousal" name="expression_arousal" placeholder="0.0 - 1.0">
          <p class="small-text col s6 m6 l6">Dominance:</p>
          <input class="col s4 m3 l3" type="text" id="expression_dominance" name="expression_dominance" placeholder="0.0 - 1.0">
        </div>
      </div>
      <!-- end of misty face settings-->

      <!--misty face settings -->
      <h5>Misty Robot Quiet Hours</h5>
      <div class="row">
          <p class="small-text col s6 m6 l6">Start Time:</p>
          <input type="text" name="start_time" placeholder="unselected" class="col s3 m3 l3 timepicker">
          <p class="small-text col s6 m6 l6">End Time:</p>
          <input type="text" name="end_time" placeholder="unselected" class="col s3 m3 l3 timepicker">
      </div>
      <!-- end of misty face settings-->

      <!-- Form submit/exit buttons here.  -->

      <div class="row center">
        <button type="submit" class="btn waves-effect waves-light" id="saveButton">Save</button>
        <button id="cancelButton" class="btn waves-effect waves-light" type="submit" name="action">Cancel</button>
      </div>
    </form>

      </div>
    </div>
    `
    if (homeState.current_page !== "misty_preferences") {
      remove_all_divs()
      $(`.container`).append(html)
    }
    homeState.current_page = "misty_preferences"
    add_all_voices()
    getAllImagesMisty()
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
  })

  /*
    Edit/View Preferences
  */

  // *** END OF MAIN HOME PAGE LISTENERS*

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

}

$(document).ready(() => {
  create_listeners();
  /*
    Materialize functions
  */
  $('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function() {} //Function for after opening timepicker
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
