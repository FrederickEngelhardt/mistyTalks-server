/*
  NOTE: State class will store all State values used in dynamic html/dom manipulations. State also stores user preferences and any database related calls. State is not saved in local storage.
*/
class State {
  constructor(current_page, user, misty_user_preferences) {
    this.current_page = current_page,
      this.user = {
        setup_done: true,
        disco_misty: false
      },
      this.misty_user_preferences = {}
  }
}
let homeState = new State('home')
let added_number_count = 1
const add_number = (count) => {
  return `<div class="deleteNumberFields${count} row center">
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
          </div>`
}

// Array of all watson voices

// HTML code to add all voices into the selection zone
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
  // Materialize listener for new elements
  $('select').material_select()
}
const eyes = [{
    "name": "Angry Eyes",
    "settings": {
      "Valence": -1,
      "Arousal": 1,
      "Dominance": 0
    }
  },
  {
    name: 'Concerned Eyes',
    settings: {
      Valence: 0,
      Arousal: 1,
      Dominance: 0
    }
  },
  {
    name: 'Confused Eyes',
    settings: {
      Valence: 1,
      Arousal: 0,
      Dominance: 0
    }
  },
  {
    name: 'Content Eyes',
    settings: {
      Valence: 0,
      Arousal: 0,
      Dominance: 0
    }
  },
  {
    name: 'Groggy Eyes',
    settings: {
      Valence: 0,
      Arousal: -1,
      Dominance: 0
    }
  },
  {
    name: 'Happy Eyes',
    settings: {
      Valence: 1,
      Arousal: 1,
      Dominance: 0
    }
  },
  {
    name: 'Loving Eyes',
    settings: {
      Valence: 1,
      Arousal: 1,
      Dominance: 1
    }
  },
  {
    name: 'Sad Eyes',
    settings: {
      Valence: -1,
      Arousal: -1,
      Dominance: 0
    }
  },
  {
    name: 'Unamused Eyes',
    settings: {
      Valence: 1,
      Arousal: -1,
      Dominance: 0
    }
  }
]
const add_all_preset_faces = () => {
  for (let i in eyes) {
    let html = `<option value="${i}">${eyes[i].name}</option>`
    $(`#choose_face_emote`).append(html)
  }
  $('select').material_select()
}
/*
    We use this variable to count the number of added phones in an array
*/

const remove_all_divs = () => {
  $(`.card_container`).remove()
}

const goHome_listener = () => {
  $('.go_to_home').on('click', () => {
    if (homeState.current_page !== 'home') {
      remove_all_divs()
      $('.display_home').removeClass('hide_this')
      homeState.current_page = 'home'
    } else {
      Materialize.toast("You are home.", 1000)
    }
  })
}

/* Account function*/
const myAccount_listener = () => {
  $('.display_home').addClass('hide_this')
  const html = `
        <div class="card_container">
          <div class="profile_card">
            <h4 class="title_box">Account Information
              <a style="background-color: #6700ED" class="right btn-floating btn-small waves-effect waves-light">
                <i class="my_account_edit material-icons">edit
                </i>
              </a></h4>
            <table>
              <tr>
                <td>Email</td>
                <td class="account_email_preferences">fre1994@gmail.com</td>
              </tr>
              <tr>
                <td>First Name</td>
                <td class="account_first_name_preferences">Frederick</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td class="account_last_name_preferences">Engelhardt</td>
              </tr>
            </table>
          </div>
        </div>
        `
  if (homeState.current_page !== 'my_account_view') {
    remove_all_divs()
    $('.container').append(html)
  }
  homeState.current_page = 'my_account_view'

  /*
      NOTE: Need to call this listener here b/c class does not exist outside this scope.
    */
  myAccountEdit_listener()
  populate_account_preferences(homeState.user.id)
}
const populate_account_preferences = (user_id) => {
  // var settings = {
  //   async: true,
  //   crossDomain: true,
  //   url: `/users/${user_id}`,
  //   method: 'GET',
  //   headers: {
  //     'Cache-Control': 'no-cache'
  //   }
  // }
  //
  // $.ajax(settings).done(function(response) {
  let response = homeState.user
  const target = [{
      location: 'account_email_preferences',
      user_info: 'email'
    },
    {
      location: 'account_first_name_preferences',
      user_info: 'first_name'
    },
    {
      location: 'account_last_name_preferences',
      user_info: 'last_name'
    }
  ]
  for (var i = 0; i < target.length; i++) {
    const data = response[target[i]['user_info']]
    $(`.${target[i].location}`).text(data)
    // $(`${target[i].location}`).val(response[target[i].user_info])
  }
}

const myAccountEdit_listener = () => {
  // NOTE function requires myAccount to run.
  $('.my_account_edit').on('click', () => {
    const html = `
        <div class="card_container">
          <div class="profile_card">
            <h4 class="title_box">Account Information</h4>
            <form id="edit_card_body">

              <!--user email -->
              <h5>Email:</h5>
              <div class="row center">
                <div class="col s9 m9 l9">
                  <input type="email" id="email" name="email" value="" placeholder="email@mistytalks.com">
                </div>
              </div>
              <!-- end of user email  -->

              <!--First Name-->
              <h5>First Name:</h5>
              <div class="row center">
                <div class="col s9 m9 l9">
                  <input type="text" id="first_name" name="first" value="" placeholder="First Name">
                </div>
              </div>
              <!--End First Name-->

              <!-- Last Name -->
              <h5>Last Name:</h5>
              <div class="row center">
                <div class="col s9 m9 l9">
                  <input type="text" id="last_name" name="last" value="" placeholder="Last Name">
                </div>
              </div>
              <!-- End Last Name -->

              <!--user password -->
              <h5>New Password:</h5>
              <div class="row">
                <div class="col s9 m9 l9">
                  <input type="password" id="previous_password" value="" placeholder="previous password">
                  <input type="password" id="password" name="email" value="" placeholder="password">
                  <input type="password" id="confirm_password" name="email" placeholder="confirm password">
                </div>
              </div>
              <!-- end of user password  -->

              <!-- Form submit/exit buttons here.  -->
              <div class="row center save_cancel_menu">
                <button type="submit" class="preference_menu_btn btn waves-effect waves-light" id="saveButton">Save</button>
                <button id="cancelButton" class="preference_menu_btn btn waves-effect waves-light" type="submit" name="action">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      `
    if (homeState.current_page !== 'my_account_edit') {
      remove_all_divs()
      $('.container').append(html)
    }
    homeState.current_page = "my_account_edit"
    $('#cancelButton').on("click", (event) => {
      event.preventDefault()
      return myAccount_listener()

    })
    $('form').submit(function(e) {
      e.preventDefault()
      retrieveAccountSubmitFormData()
    })
  })
}

const retrieveAccountSubmitFormData = () => {
  let password_confirm = $("#confirm_password").val(),
    password = $("#password").val(),
    previous_password = $("#previous_password").val()

  if (password !== password_confirm) {
    return Materialize.toast('Passwords do not match.', 3000)
  }
  if (
    (password.length > 0 && password.length < 8) ||
    (password_confirm.length > 0 && password_confirm.length < 8) ||
    (previous_password.length > 0 && previous_password.length < 8)
  ) {
    return Materialize.toast('Passwords need to be at least 8 digits.', 3000)
  }
  if (password) {
    if (previous_password.length === 0) {
      return Materialize.toast('Please enter previous passoword.', 3000)
    }
  }
  /*Iterate through form information. The store inside a JSON object*/
  let data = new Object()
  let form_ids = [
    'email',
    'first_name',
    'last_name',
    'previous_password',
    'password'
  ]
  for (let key in form_ids) {
    data[form_ids[key]] = $(`#${form_ids[key]}`).val()
    if (data[form_ids[key]] === '') {
      delete data[form_ids[key]]
    }
  }
  sendAccountSubmitForm(data, homeState.user.id)
}
const sendAccountSubmitForm = (data, user_id) => {
  var settings = {
    async: true,
    crossDomain: true,
    url: `/users/${user_id}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    processData: false,
    data: JSON.stringify(data)
  }

  $.ajax(settings)
    .done(function(response) {
      myAccount_listener()
      Materialize.toast(response, 3000)
    })
    .fail(fail_message => {
      Materialize.toast(fail_message.responseText, 3000)
    })
}
// END of account functions

/* MISTY_PREFERENCES Functions*/
const mistyPreferences_listener = () => {
  $(".display_home").addClass("hide_this")
  const html = `
          <div class="card_container">
            <div class="profile_card">
              <h4 class="title_box">Misty Preferences
                <a style="background-color: #6700ED" class="right btn-floating btn-small waves-effect waves-light">
                  <i class="edit_misty_preferences material-icons">edit
                  </i>
                </a></h4>
              <table>
                <tr>
                  <td>Preference Name:</td>
                  <td class="misty_preference_name"></td>
                </tr>
                <tr>
                  <td>Robot Name:</td>
                  <td class="misty_robot_name"></td>
                </tr>
                <tr>
                  <td>IP Address:</td>
                  <td class="misty_ip_address"></td>
                </tr>
                <tr>
                  <td>Port Number:</td>
                  <td class="misty_port_number"></td>
                </tr>
                <tr>
                  <td>Authorized Phone Numbers</td>
                  <td class="misty_authorized_numbers"></td>
                </tr>
                <tr>
                  <td>Misty Voice:</td>
                  <td class="misty_voice"></td>
                </tr>
                <tr>
                  <td>Misty Face Name:</td>
                  <td class="misty_face_name"></td>
                </tr>
                <tr>
                  <td>Misty Robot Face</td>
                  <td class="misty_robot_face"></td>
                </tr>
                <tr>
                  <td>Quiet Hours</td>
                  <td class="misty_quiet_hours"></td>
                </tr>
              </table>
            </div>
          </div>
      `

  if (homeState.current_page !== 'misty_preferences_view') {
    remove_all_divs()
    $('.container').append(html)
  }
  homeState.current_page = 'misty_preferences_view'
  /*
    Must call this listner b/c classes inside listner do not exist outside of this scope
  */
  editMistyPreferences_listener()
  console.log('called. JUST B4');
  populate_misty_preferences(homeState.user.id)
}
const populate_misty_preferences = user_id => {
  var settings = {
    async: true,
    crossDomain: true,
    url: `/users/${user_id}/misty_preferences`,
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache'
    }
  }

  $.ajax(settings).done(function(response_array) {
      let response = response_array[0]
      console.log("THIS IS RESPONSE", response);
      if (response === [] || !response || response === undefined) {
        return homeState.user.setup_done = false
      }
      console.log();
      homeState.user.preference_id = response.id
      homeState.misty_user_preferences.robot_name = response.robot_name
      const target = [{
          location: "misty_preference_name",
          user_info: "preference_name"
        },
        {
          location: 'misty_robot_name',
          user_info: 'robot_name'
        },
        {
          location: 'misty_authorized_numbers',
          user_info: 'auth_numbers_string'
        },
        {
          location: 'misty_ip_address',
          user_info: 'ip_address'
        },
        {
          location: 'misty_port_number',
          user_info: 'port_number'
        },
        {
          location: "misty_voice",
          user_info: "misty_voice_name"
        },
        {
          location: "misty_face_name",
          user_info: "misty_face_name"
        },
        {
          location: 'misty_robot_face',
          user_info: [
            'set_emotion_valence',
            'set_emotion_arousal',
            'set_emotion_dominance'
          ]
        },
        {
          location: 'misty_quiet_hours',
          user_info: ['time_restriction_start', 'time_restriction_end']
        }
      ]
      for (var i = 0; i < target.length; i++) {
        if (target[i].location === "misty_port_number" && response[target[i].user_info] === null) {
          const data = `Disabled`
          $(`.${target[i].location}`).text(data)
        } else if (target[i].location === "misty_quiet_hours") {
          if (response[target[i].user_info[0]] === null && response[target[i].user_info[1]] === null) {
            const data = `Disabled`
            $(`.${target[i].location}`).text(data)
          } else {
            const data = `Between ${response[target[i].user_info[0]]} and ${response[target[i].user_info[1]]}`
            $(`.${target[i].location}`).text(data)
          }
        } else if (target[i].location === "misty_robot_face") {
          const data = `Valence: ${response[target[i].user_info[0]]} <br> Arousal: ${response[target[i].user_info[1]]} <br>Dominance: ${response[target[i].user_info[2]]}`
          $(`.${target[i].location}`).html(data)
        } else {
          const data = response[target[i]['user_info']]
          $(`.${target[i].location}`).text(data)
        }
        // $(`${target[i].location}`).val(response[target[i].user_info])
      }
    })
    .fail((error_response) => {
      Materialize.toast("Misty Preferences require setup. Click edit to enter new preference.", 3000)
      homeState.user.setup_done = false
    })
}
const editMistyPreferences_listener = () => {
  // NOTE function requires mistyPreferences_listener to run.
  $('.edit_misty_preferences').on('click', () => {
    $('.display_home').addClass('hide_this')
    const html = `
      <div class="card_container">
        <div class="profile_card white">

          <form id="edit_card_body">
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
                <input type="text" id="robot_name" name="robot_name" value="" placeholder="Robot Name">
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
            <h5>Port Number:</h5>
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
                  <input type="tel" id="phone_country_code1" name="country_code" value="+1" placeholder="+1">
                </div>
                <div class="col s7 m7 l7">
                  <input type="tel" id="phone_number1" name="phone" value="" placeholder="XXX-XXX-XXXX">
                </div>
                <div class="col s2 m2 l2">
                  <!-- <a style="background-color:  green" class="addNumber modal-trigger btn-floating btn-small waves-effect waves-light">
                  <i class="material-icons">add</i>
                </a> -->
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
            <h5>Misty Robot Preset Faces</h5>
            <div class="row">
              <div class="input-field col browser-default s9 m9 l9">
                <select id="choose_face_emote">
                    <option value="" disabled selected>Select Misty Preset Face</option>
                  </select>
              </div>
            </div>
            <h5>Misty Robot Custom Face</h5>
            <div class="row">
              <div class="input-field col browser-default s9 m9 l9">
                <p class="small-text col s6 m6 l6">Valence:</p>
                <input class="col s3 m3 l3" type="text" id="expression_valence" name="expression_valence" placeholder="[-1,1]">
                <p class="small-text col s6 m6 l6">Arousal:</p>
                <input class="col s3 m3 l3" type="text" id="expression_arousal" name="expression_arousal" placeholder="[-1,1]">
                <p class="small-text col s6 m6 l6">Dominance:</p>
                <input class="col s4 m3 l3" type="text" id="expression_dominance" name="expression_dominance" placeholder="[-1,1]">
              </div>
            </div>
            <!-- end of misty face settings-->

            <!--misty face settings -->
            <h5>Misty Robot Quiet Hours</h5>
            <div class="row">
                <p class="small-text col s6 m6 l6">Start Time:</p>
                <input type="text" id="start_time" placeholder="Disabled" class="col s3 m3 l3 timepicker">
                <p class="small-text col s6 m6 l6">End Time:</p>
                <input type="text" id="end_time" placeholder="Disabled" class="col s3 m3 l3 timepicker">
            </div>
            <!-- end of misty face settings-->

            <!-- Form submit/exit buttons here.  -->

            <div class="row center save_cancel_menu">
              <button type="submit" class="preference_menu_btn btn waves-effect waves-light" id="saveButton">Save</button>
              <button id="cancelButton" class="preference_menu_btn btn waves-effect waves-light" name="action">Cancel</button>
            </div>
          </form>

        </div>
      </div>
    `
    if (homeState.current_page !== 'misty_preferences_edit') {
      remove_all_divs()
      $(`.container`).append(html)
    }
    homeState.current_page = "misty_preferences_edit"
    $('#cancelButton').on("click", (event) => {
      event.preventDefault()
      return mistyPreferences_listener()

    })
    // listen to the form submission
    $('form').submit(function(e) {
      e.preventDefault()
      retrieveMistyPreferencesSubmitFormData()
    })
    add_all_voices()
    add_all_preset_faces()

    // Materialize listener
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
    })
  })
}
const retrieveMistyPreferencesSubmitFormData = () => {
  let preference_name = $("#preference_name").val(),
    robot_name = $("#robot_name").val(),
    ip_address = $("#ip_address").val(),
    port_number = $("#port_number").val(),
    phone_number1 = $("#phone_number1").val() + $("#phone_country_code1").val(),
    misty_voice_choice = $("#choose_voices :selected").text(),
    misty_face_choice = $("#choose_face_emote :selected").text(),
    misty_face_valence = $("#expression_valence").val(),
    misty_face_arousal = $("#expression_arousal").val(),
    misty_face_dominance = $("#expression_dominance").val(),
    misty_quiet_start = $("#start_time").val(),
    misty_quiet_end = $("#end_time").val(),
    data = {
      "misty_user_preference_id": homeState.user.id,
      "preference_name": preference_name,
      "robot_name": robot_name,
      "ip_address": ip_address,
      "auth_numbers_string": phone_number1,
      "misty_voice_name": misty_voice_choice,
      "misty_face_name": misty_face_choice,
      "set_emotion_valence": misty_face_valence,
      "set_emotion_arousal": misty_face_arousal,
      "set_emotion_dominance": misty_face_dominance,
      "time_restriction_start": misty_quiet_start,
      "time_restriction_end": misty_quiet_end
    }
  /*Iterate through form information. The store inside a JSON object*/
  for (let i in data) {
    if (data[i] === '' || data[i] === "Choose your misty Voice" || data[i] === "Select Misty Preset Face") {
      delete data[i]
    }
  }
  if (data.auth_numbers_string.length < 11) {
    delete data.auth_numbers_string
  }
  if (data.misty_face_choice && data.misty_face_valence || data.misty_face_choice && data.misty_face_arousal || data.misty_face_choice && data.misty_face_dominance) {
    return Materialize.toast("Please select either a preset Misty Face or make your own custom face.")
  }
  if (misty_face_choice) {
    for (let i in eyes) {
      if (eyes[i].name === misty_face_choice) {
        data["set_emotion_valence"] = eyes[i].settings.Valence,
          data["set_emotion_arousal"] = eyes[i].settings.Arousal,
          data["set_emotion_dominance"] = eyes[i].settings.Dominance
      }
    }
  }
  // IP ADDRESS REGEX
  if (data.ip_address) {
    const re = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if (!re.test(data.ip_address)) {
      return Materialize.toast("IP Address in an invalid format.")
    }
  }
  sendMistyPreferencesSubmitForm(data, homeState.user.id)
}
const sendMistyPreferencesSubmitForm = (data, user_id) => {
  let method = {
    type: "PATCH",
    url: `/users/${user_id}/misty_preferences/${homeState.misty_user_preferences.misty_user_preference_id}`
  }
  if (homeState.user.setup_done === false) {
    method = {
      type: "POST",
      url: `/users/${user_id}/misty_preferences`
    }
  }
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": method.url,
    "method": `${method.type}`,
    "headers": {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    processData: false,
    data: JSON.stringify(data)
  }
  $.ajax(settings).done(function(response) {
    Materialize.toast(response, 3000)
    return mistyPreferences_listener()

  }).fail((fail_message) => {
    Materialize.toast(fail_message.responseText, 3000)
  })
}
// END of misty preferences Functions



const directTalk_listener = () => {
  $('.display_home').addClass('hide_this')
  const html = `
        <div class="card_container">
          <div class="chatcont" >
            <center><h5 class="title_box">Misty Direct Talk</h5></center>
            <center>
            <div class="chatMsgs">
              <!-- additional assets coming from direct_talk.js -->
              <div class="chatOut">
              </div>
            </div>
            <div class="inputSubForm">
              <textarea id="message" placeholder= "Message"></textarea>
              <button class="btn waves-effect waves-light" id="sendMessBtn">
              <div class="chat_text_button">Send</div></button>
            </div>
          </div>
        </div>
        `
  if (homeState.current_page !== 'direct_talk') {
    remove_all_divs()
    $('.container').append(html)
  }
  message_listener()
  homeState.current_page = 'direct_talk'
}

const message_listener = () => {

  $('#sendMessBtn').click(() => {
    let email = homeState.user.email;
    let robot_name = homeState.misty_user_preferences.robot_name
    console.log('clicked')
    message = $('#message').val()
    sendTextToWatson(message)
    console.log('about to call newOutbound')
    newOutbound(email, robot_name)

    console.log(message, robot_name, 'in DTL')
    console.log(message, 'in DTL #2')

  })
}
const sendTextToWatson = (text, voice) => {
  if (!voice) voice = "en-GB_KateVoice"
  console.log(text);
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "/watson/receive",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "processData": false,
    "data": JSON.stringify({
      "text": `${text}`,
      "voice": `${voice}`,
    })
  }

  $.ajax(settings).done(function(response) {
    console.log(response);
  });
}
const newOutbound = (email, robot_name) => {
  if (!robot_name) {
    robot_name = "Robot";
  }
  console.log("user email: ", homeState.user.email)
  console.log("user robot name: ", robot_name);

  if (robot_name.length > 0) {
    robot_name = robot_name.charAt(0).toUpperCase() + robot_name.slice(1)
    console.log(robot_name, 1)
    console.log('in here')

    if (message.length > 0) {
      console.log('in message length here')
      let outName = `<div class="chatName"><strong> ${robot_name}</strong></div><p class="chatSubj">${message}</p>`
      //  $(".chatName").prepend(outName)
      // $(".chatSubj").prepend(outMessage)
      $('.chatOut').append(`${outName}`)
      // output
      $('#message').val('')
    }
  } else if (email) {
    // use phone number as identifier name if no first or last is available
    let newArr = []
    if (message.length > 0) {
      let outName = `<div class="chatName"><strong> ${email}</strong></div>`
      let outMessage = `<p class="chatSubj">${message}</p>`
      $('.chatOut').append(outName, outMessage)
      // output
      $('#message').val('')
    }
  }
}

const verifyUserPermissionsToken = () => {

  // grab user token, see whos logged in
  //put into state class for user

  $.get('/users/token').done((result) => {
    // if (!result) window.location.href = '/index.html'
    homeState.user.id = result.cookie.user_id
    homeState.user.email = result.cookie.email
  }).fail((msg) => {
    Materialize.toast(msg.responseText, 3000);
    setTimeout(function() {
      return window.location.href = '/index.html'
    }, 1000)

  })
}


const logout_remove_token = () => {
  $('.logout').on('click', () => {
    const options = {
      dataType: 'json',
      type: 'DELETE',
      url: '/users/token'
    }
    $.ajax(options)
      .done(() => {
        window.location.href = '/index.html'
      })
      .fail(() => {
        Materialize.toast('Unable to log out', 3000)
      })
  })
}
const misty_face_changer = () => {
  $('.surprise_me_toggle').on("click", () => {
    const repeatRandomize = setInterval(randomizeMistyFaceAndLights, 10000)
    if (homeState.user.disco_misty === false) {
      $('.surprise_me_toggle').addClass('red')
      homeState.user.disco_misty = true
      repeatRandomize
    } else {
      $('.surprise_me_toggle').removeClass('red')
      homeState.user.disco_misty = false;
      clearInterval(repeatRandomize)
    }
  })
}
const randomizeMistyFaceAndLights = () => {
  // REQUIRES misty_face_changer to be called
  let misty_face_valence = Math.random() * 2 - 1,
    misty_face_arousal = Math.random() * 2 - 1,
    misty_face_dominance = Math.random() * 2 - 1
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://192.168.1.129/Api/eyes/change",
    "method": "POST",
    "headers": {},
    "data": JSON.stringify({
      "Valence": `${misty_face_valence}`,
      "Arousal": `${misty_face_arousal}`,
      "Dominance": `${misty_face_dominance}`,
    })
  }
  let r = Math.floor(Math.random() * 255),
    g = Math.floor(Math.random() * 255),
    b = Math.floor(Math.random() * 255)

  $.ajax(settings).done(function(response) {
    console.log(response);
  });
  const color_settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://192.168.1.129/Api/led/change",
    "method": "POST",
    "headers": {},
    "data": JSON.stringify({
      "red": `${r}`,
      "green": `${g}`,
      "blue": `${b}`
    })
  }
  $.ajax(color_settings).done(function(response) {
    console.log(response);
  });
}


const open_user_information_socket = () => {
  let socket = io('')
  let mistyChannel = homeState.user.email
  socket.on('connect', () => {
    console.log('new connection', mistyChannel)
    socket.emit('/users/:id/misty_preferences', homeState.user.id)
    socket.emit('/users/:id', homeState.user.id)
    socket.on('/users/:id/misty_user_preferences/response', (response) => {
      homeState.misty_user_preferences = response[0]
      console.log(response[0]);
    })
    socket.on('/users/:id/response', (response) => {
      homeState.user = response
      console.log(response);
    })
  })
  // socket.on('message', function(data) {
  //   console.log('Incoming message:', data)
  // })
}

const create_listeners = () => {
  // **** MAIN HOME PAGE LISTENERS ****
  // Token listeners
  verifyUserPermissionsToken()
  logout_remove_token()

  // populateHomeStateObject()
  // Nav listeners
  setTimeout(open_user_information_socket, 2000)
  goHome_listener()
  /*Edit/View Account*/
  $('.go_to_my_account').on('click', () => {
    myAccount_listener()
  })
  $(".go_to_misty_preferences").on("click", () => {
    mistyPreferences_listener()
  })
  // Go to DISCO Misty on click
  misty_face_changer()

  $(".go_to_direct_talk").on("click", () => {
    directTalk_listener()
  })

  /*Edit/View Preferences*/

  // *** END OF MAIN HOME PAGE LISTENERS*

  /*
    addNumber lets you add multiple numbers to the form.
  */
  $('.addNumber').click(() => {
    added_number_count++
    $('#add_phone_number_location').append(add_number(added_number_count))
    $(`.removeNumber${added_number_count}`).on('click', () => {
      console.log('clicked')
      $(`.deleteNumberFields${added_number_count}`).remove()
      added_number_count--
      console.log(added_number_count)
    })
  })
  // end of addNumber
}

$(document).ready(() => {
  create_listeners();
  $('.collapsible').collapsible(); // for "about page" collapsible containers
  /*
    Materialize functions
  */
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%' // Ending top style attribute
    // ready: function(modal, trigger) {
    // },
    // complete: function() {}
  })
  $('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true
    // onOpen: function(el) {}
    // onClose: function(el) {}
  })
  /*
    End of Materialize functions
  */
})
