const login_modal = `<div id="account_preferences_modal" class="grey darken-3 modal">
    <div class="modal-content">
      <!-- profile information is inserted in here -->
      <div id="profile_card" class="row center">
        <div class="col s12 m12 l12">
          <div class="row">
          </div>
          <div id="myProfile">
            <table>
              <thead>
                <div><h3 class="left">My Profile</h3></div>
                <div id="show_avatar_image"></div>
            </thead>
              <tbody class="profBody">
                <tr>
                  <td>First Name</td>
                  <td id="first_name"></td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td id="last_name"></td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td id="phone_number"></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td id="email_address"></td>
                </tr>
                <tr>
                  <td>Skill Level</td>
                  <td id="skill_level_id"></td>
                </tr>
                <tr>
                  <td>Bio</td>
                  <td id="bio"></td>
                </tr>
              </tbody>
            </table>
            <div class="row center">
              <button id="editButton" class="btn waves-effect waves-light" type="submit" name="action">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="create_lesson_modal_insert">
    <!-- modal is put here -->
  </div>`

module.exports = login_modal
