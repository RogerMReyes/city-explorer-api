'use strict';

// REQUIRES
// require is used instead of import in servers
let express = require('express');
require('dotenv').config();
let cors = require('cors');
let getWeather = require('./my-weather.js');
let getMovies = require('./movies.js');

// USE
// assign required file a variable
let app = express();
app.use(cors());

let PORT = process.env.PORT || 3002;

// ROUTES
// endpoints
app.get('/', (request, response) => {
  response.send('Default Route');
});


app.get('/weather', getWeather);


app.get('/movies', getMovies);


app.get('*', (request, response) => {
  response.send('Not a valid request!');
});

// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


// LISTEN
// Start the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));