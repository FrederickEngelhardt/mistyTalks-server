install npm
createdb mistyTalks_dev
createdb mistyTalks_test
knex migrate:latest
knex seed:run


Using Technologies:
Watson API
Knex


Run NPM tests:
  npm test tests/migration_tests
  npm test tests/route_tests
  npm test tests/seed_tests


Twilio API (TextToSpeech)

Plan for Server Routes:
GET
/users/ - all users info
/misty_preferences/ - all user preferences

POST
/users/- (email, password)
/users/login/ - login current users
/misty_preferences/:misty_preference_id/ (preference name, robot name, ip address, port number)

PATCH
/users/:user_id - updating email, password
/misty_preferences/:misty_preference_id - (preference name, robot name, ip address, port number)

DELETE
app.delete
/users/:id/preferences/:id/ - deleting user account

Style guide - very basic user portal with similar styling as their home website... https://www.mistyrobotics.com/

Trello board... https://trello.com/b/dh2aemKQ/project-misty


Schema/ERD for your database
// - The plan for your server routes
- Fairly detailed wireframes for each page of your application
- A style guide
- A link to your planning tool (such as Pivotal Tracker, Trello, or Waffle) with a collection of user-centered stories that identify MVP and Stretch stories
