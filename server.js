'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weather = require('./modules/weather.js');
const getMovies = require('./movies');
const getYelp = require('./modules/yelp.js');

const app = express();
app.use(cors());

let PORT = process.env.PORT || 3002

app.get('/', (request, response) => {
  response.send('Default Route');
});

app.get('/weather', weatherHandler);

app.get('/movies', getMovies);

app.get('/yelp', getYelp);


function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
