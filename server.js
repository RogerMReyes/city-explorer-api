'use strict';

// console.log('first server');

// REQUIRES
// require is used instead of import in servers
let express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json')
let cors = require('cors');
let axios = require('axios');

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

app.get('/weather', async (request, response, next) => {
  try{
    let locationLat = request.query.lat;
    let locationLon = request.query.lon;
    let weatherURL = `https://api.weatherbit.io/v2.0/current?lat=${locationLat}&lon=${locationLon}&key=${process.env.WEATHERBIT_API_KEY}&units=I`;
    let weatherInfo = await axios.get(weatherURL);
    let forecastArr = weatherInfo.data.data.map(object => new Forecast(object));
    response.status(200).send(forecastArr);
  }
  catch{
    next(error);
  }
});

app.get('/movies', async (request,response, next) => {
  try {
    let locationName = request.query.locationName;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&query=${locationName}&page=1&include_adult=false`;
    let movieInfo = await axios.get(movieURL);
    console.log(movieInfo);
    let movieArr = movieInfo.data.results.map(object => new Movies(object));
    response.status(200).send(movieArr);
  }
  catch {
    next(error);
  }
})

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
    this.description = dataset.weather.description;
    this.temp = dataset.temp;
  }
}

class Movies {
  constructor(dataset){
    this.title = dataset.title;
    this.popularity = dataset.popularity;
    this.overview = dataset.overview;
  }
}

// LISTEN
// Start the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));