const createAccount = (data='') => {
        if (data === '') {
          let first_name = ''
          let last_name = ''
          let email = $('.email-signup-input-text').val()
          let password = $('.password-signup-input-text').val()
          let password_confirm = $('.password_confirm-signup-input-text').val()

          if (password === password_confirm) {
            console.log("it worked good pword");
            console.log(password, " ", password_confirm);
            data = {first_name, last_name, email, password}
          }

          else {
            console.log("it worked bad pword");
            Materialize.toast('Passwords Do Not Match', 3000)
            return false
          }

        }

        console.log(data)




        $.ajax({
           headers:{
           },
           type: "POST",
           url: "http://localhost:3000/users",
           dataType: "json",
           success: function (msg) {
             console.log("got here");
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
           data: data
        })
        .done(() => {
          window.location.href = '/home.html'
        })
        .fail(($xhr) => {
          Materialize.toast('Invalid Email or Password', 3000)
        })
}
$(document).ready( () => {
  $('#signup-btn').click(function(event){
    event.preventDefault()
    createAccount()
  })
})
/* TESTS */
// let user1 = {"first_name":"This is a Test","last_name":"TEST","phone_number":"303-654-3210","email_address":"spiggy6@gmail.com","password":"hello123@Ilikecats","skill_level_id": "4","bio":"Stupid Tests all day long"}
// console.log(createAccount(user1));
