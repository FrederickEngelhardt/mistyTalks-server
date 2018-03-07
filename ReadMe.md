install npm
createdb users, misty_preferences

Watson API

Run NPM tests:
  npm test test/migration_tests
  npm test test/route_tests
  npm test test/seed_tests

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
