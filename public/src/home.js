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
    "language": "es-LA",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/es-LA_SofiaVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Sofia: Latin American Spanish (español latinoamericano) female voice."
  },
  {
    "name": "pt-BR_IsabelaVoice",
    "language": "pt-BR",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/pt-BR_IsabelaVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Isabela: Brazilian Portuguese (português brasileiro) female voice."
  },
  {
    "name": "en-GB_KateVoice",
    "language": "en-GB",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/en-GB_KateVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Kate: British English female voice."
  },
  {
    "name": "de-DE_BirgitVoice",
    "language": "de-DE",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/de-DE_BirgitVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Birgit: Standard German of Germany (Standarddeutsch) female voice."
  },
  {
    "name": "en-US_AllisonVoice",
    "language": "en-US",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/en-US_AllisonVoice",
    "supported_features": {
      "voice_transformation": true,
      "custom_pronunciation": true
    },
    "description": "Allison: American English female voice."
  },
  {
    "name": "fr-FR_ReneeVoice",
    "language": "fr-FR",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/fr-FR_ReneeVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Renee: French (français) female voice."
  },
  {
    "name": "it-IT_FrancescaVoice",
    "language": "it-IT",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/it-IT_FrancescaVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Francesca: Italian (italiano) female voice."
  },
  {
    "name": "es-ES_LauraVoice",
    "language": "es-ES",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/es-ES_LauraVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Laura: Castilian Spanish (español castellano) female voice."
  },
  {
    "name": "ja-JP_EmiVoice",
    "language": "ja-JP",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/ja-JP_EmiVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Emi: Japanese (日本語) female voice."
  },
  {
    "name": "es-ES_EnriqueVoice",
    "language": "es-ES",
    "customizable": true,
    "gender": "male",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/es-ES_EnriqueVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Enrique: Castilian Spanish (español castellano) male voice."
  },
  {
    "name": "de-DE_DieterVoice",
    "language": "de-DE",
    "customizable": true,
    "gender": "male",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/de-DE_DieterVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Dieter: Standard German of Germany (Standarddeutsch) male voice."
  },
  {
    "name": "en-US_LisaVoice",
    "language": "en-US",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/en-US_LisaVoice",
    "supported_features": {
      "voice_transformation": true,
      "custom_pronunciation": true
    },
    "description": "Lisa: American English female voice."
  },
  {
    "name": "en-US_MichaelVoice",
    "language": "en-US",
    "customizable": true,
    "gender": "male",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/en-US_MichaelVoice",
    "supported_features": {
      "voice_transformation": true,
      "custom_pronunciation": true
    },
    "description": "Michael: American English male voice."
  },
  {
    "name": "es-US_SofiaVoice",
    "language": "es-US",
    "customizable": true,
    "gender": "female",
    "url": "https://stream.watsonplatform.net/text-to-speech/api/v1/voices/es-US_SofiaVoice",
    "supported_features": {
      "voice_transformation": false,
      "custom_pronunciation": true
    },
    "description": "Sofia: North American Spanish (español norteamericano) female voice."
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
  $(".login_btn").click(() => {
    console.log("clicked");
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
  return new Promise((resolve) => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://192.168.1.129/Api/GetListOfImages",
      "method": "GET",
      "headers": {
        "Cache-Control": "no-cache"
      }
    }

    $.ajax(settings).done(function(response) {
      let audioFiles = response[0].result
      for (let i in audioFiles) {
        console.log(audioFiles[i]);
      }
      console.log(response);
    });
  })
}
getAllImagesMisty()
$(document).ready(() => {
  add_all_voices()
  create_listeners();


  /*
    Materialize functions
  */
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
