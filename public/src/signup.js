const createAccount = (data='') => {
        if (data === '') {
          let bio = ''
          let first_name = $('#first_name').val()
          let last_name = $('#last_name').val()
          let phone_number = $('#phone_number').val()
          let skill_level_id = $('#skill_level').val()
          let email_address = $('#email').val()
          let password = $('#password').val()
          data = {first_name, last_name, phone_number, skill_level_id, email_address, password, bio}
        }
        console.log(data)
        $.ajax({
           headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
           type: "POST",
           url: "/users",
           dataType: "json",
           success: function (msg) {
               if (msg) {
                   console.log("User" + " was added in list !");
                   // location.reload(true);
                   /* Activate this refresh when we hit submit.
                   even better way is:
                   $('#thisdiv').load(document.URL +  ' #thisdiv');
                    */
               } else {
                   alert("Cannot add to list !");
               }
           },
           data: JSON.stringify(data)
        })
        .done(() => {
          window.location.href = '/home.html'
        })
        .fail(($xhr) => {
          Materialize.toast('Invalid Email or Password', 3000)
        })
}
$(document).ready( () => {
  $('.modal').modal();
  $('#newAccount').click(function(event){
    event.preventDefault()
    createAccount()
  })
})
/* TESTS */
// let user1 = {"first_name":"This is a Test","last_name":"TEST","phone_number":"303-654-3210","email_address":"spiggy6@gmail.com","password":"hello123@Ilikecats","skill_level_id": "4","bio":"Stupid Tests all day long"}
// console.log(createAccount(user1));
