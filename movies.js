'use strict';
let axios = require('axios');
let cache = require('./modules/cache.js');


class Movies {
  constructor(dataset){
    this.title = dataset.title;
    this.popularity = dataset.popularity;
    this.overview = dataset.overview;
    this.posterPath = dataset.poster_path
  }
}

function getMovies(req, res) {
  let locationName = req.query.locationName;
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&query=${locationName}&page=1&include_adult=false`;
  let key = 'movie-city-' + locationName;
  console.log(cache);
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
    res.status(200).send(cache[key].data);

  } else{
    cache[key] = {};
    cache[key].timestamp = Date.now();
    axios.get(movieURL)
      .then(movieInfo => movieInfo.data.results.map(object => new Movies(object)))
      .then(newMoviesInfo => {
        cache[key].data = newMoviesInfo;
        res.status(200).send(newMoviesInfo)
      })
      .catch(err => console.error(err));
  }
}

module.exports = getMovies;

// OLD Solution
// app.get('/movies', async (request,response, next) => {
//   try {
//     let locationName = request.query.locationName;
//     let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&query=${locationName}&page=1&include_adult=false`;
//     let movieInfo = await axios.get(movieURL);
//     let movieArr = movieInfo.data.results.map(object => new Movies(object));
//     response.status(200).send(movieArr);
//   }
//   catch {
//     next(error);
//   }
// })