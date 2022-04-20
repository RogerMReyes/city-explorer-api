'use strict';

// console.log('first server');

// REQUIRES
// require is used instead of import in servers
let express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json')
let cors = require('cors');

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

app.get('/weather', (request, response, next) => {
  try{

    let locationInput = request.query.location;
    let locationLat = parseInt(request.query.lat);
    let locationLon = parseInt(request.query.lon);
    
    let locationData = weatherData.find(data => 
      data.city_name === locationInput 
      && parseInt(data.lat) === locationLat 
      && parseInt(data.lon) === locationLon
    );
    let forecastArr = [];
    locationData.data.forEach(object => {
      forecastArr.push(new Forecast(object));
    });
    response.send(forecastArr);
  }
  catch{
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('Not a valid request!');
});

// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

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