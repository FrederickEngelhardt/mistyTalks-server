const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const routes = require("./watson");
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.use(routes)

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));
