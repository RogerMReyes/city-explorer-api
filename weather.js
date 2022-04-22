'use strict';
let axios = require('axios');


class Forecast {
  constructor(dataset){
    this.date = dataset.datetime;
    this.description = dataset.weather.description;
    this.icon = dataset.weather.icon;
    this.temp = dataset.temp;
  }
}

function getWeather(req, res) {
  let locationLat = req.query.lat;
  let locationLon = req.query.lon;
  // OLD 1 day
  // let weatherURL1 = `https://api.weatherbit.io/v2.0/current?lat=${locationLat}&lon=${locationLon}&key=${process.env.WEATHERBIT_API_KEY}&units=I`
  //16 Day Forecast
  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${locationLat}&lon=${locationLon}&key=${process.env.WEATHERBIT_API_KEY}&units=I`


  // Refactor for URL not working STRETCH: Find out why
  // let weatherURL = 'https://api.weatherbit.io/v2.0/current';
  // let weatherParams = {
  //   key: process.env.WEATHERBIT_API_KEY,
  //   lat: locationLat,
  //   lon: locationLon,
  //   units: 'I'
  // }

  axios.get(weatherURL2)
    .then(weatherInfo => weatherInfo.data.data.map(object => new Forecast(object)))
    .then(newWeatherInfo => res.status(200).send(newWeatherInfo))
    .catch(err => console.error(err));
}

module.exports = getWeather;

// OLD Solution
// app.get('/weather', async (request, response, next) => {
//   try{
//     let locationLat = request.query.lat;
//     let locationLon = request.query.lon;
//     let weatherURL = `https://api.weatherbit.io/v2.0/current?lat=${locationLat}&lon=${locationLon}&key=${process.env.WEATHERBIT_API_KEY}&units=I`;
//     let weatherInfo = await axios.get(weatherURL);
//     let forecastArr = weatherInfo.data.data.map(object => new Forecast(object));
//     response.status(200).send(forecastArr);
//   }
//   catch{
//     next(error);
//   }
// });