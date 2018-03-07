const express = require('express')
const knex = require('../knex')
const router = express.Router()

router.post('/sms', (req, res) => {
  console.log(req.body);
  //
  // twiml.message('The Robots are coming! Head for the hills!');
  //
  // res.writeHead(200, {'Content-Type': 'text/xml'});
  // res.end(twiml.toString());
})

module.exports = router;
