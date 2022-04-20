'use strict';

// console.log('first server');

// REQUIRES
// require is used instead of import in servers
let express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json')

// USE
// assign required file a variable
let app = express();

let PORT = process.env.PORT || 3002;

// ROUTES
// endpoints
app.get('/', (request, response) => {
  response.send('Default Route');
});

app.get('/weather', (request, response) => {
  let locationInput = request.query.location;
  console.log(request.query.location);
  let locationData = weatherData.find(data => data.city_name === locationInput);
  let forecastArr = [];
  locationData.data.forEach(object => {
    forecastArr.push(new Forecast(object));
  });
  response.send(forecastArr);
});

app.get('*', (request, response) => {
  response.send('Not a valid request!');
});

// ERRORS
// Handle any errors

// CLASSES
class Forecast {
  constructor(dataset){
    this.date = dataset.datetime;
    this.description = dataset.weather.description
  }
}

// LISTEN
// Start the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));