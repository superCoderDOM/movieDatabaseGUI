// initialize Express in project
const express = require('express'),
      app = express(),
      env = require('./.env'),
      request = require('request'),
      port = process.env.PORT || 8080,
      tmdb_img_path = "https://image.tmdb.org/t/p/w185/";

// set 'ejs' as template source for view engine
app.set('view engine', 'ejs');

// set public as folder to target for all static assets
app.use(express.static('public'));

// if 'server' is targeted without parameters
// render pages/index
app.get('/', (req, res) => {
  getPopMovies(res);
})

// if 'server/movie' is targeted with a movieId as parameter
// render pages/movie with data of specfic movie
app.get('/movie/:movieId', (req, res) => {
  getThisMovie(res, req.params.movieId);
})

// if 'server/search' is targeted with title keywords as parameters
// render pages/index with movies matching search parameters
app.get('/search', (req, res) => {
  searchAllMovies(res, req.query.keywords);
})

// start Express on port 8080
app.listen(port, () => {
	console.log('Server Started on http://localhost:' + port);
	console.log('Press CTRL + C to stop server');
});

/*=====================
  ALL OTHER FUNCTIONS
=====================*/

// retrieve movie synopsis from TMDB JSON object
function getPopMovies(res){
  
  //add URI encoded movie title to TMDB search request    
  const url = "https://api.themoviedb.org/3/movie/popular?api_key="+ env.tmdb_api +"&language=en-US&page=1";

  // request json object from TMDB and retrieve synopsis
  request(url, function(error, response, body){

    // if no error, process data
    if(!error){

        // return response string to JSON object
        const movieObject = JSON.parse(body);
        res.render('pages/index_deeper', {movieDB: movieObject.results, searchResults: false, imagePath: tmdb_img_path});        
    }
    // otherwise show the error returned
    else{
        console.log(`We’ve encountered an error: ${error}`);
      }
    });
  return;
}

// retrieve movie data for specified id
function getThisMovie(res, movieId) {

  //add URI encoded movie title to TMDB search request    
  const url = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key="+ env.tmdb_api +"&language=en-US";

  // request json object from TMDB and retrieve synopsis
  request(url, function(error, response, body){

    // if no error, process data
    if(!error){

      // return response string to JSON object
      const movieObject = JSON.parse(body);

      // loop through all key:value pairs in movieObject 
      for (let key in movieObject) {
        // if value is an array
        if (movieObject[key] == null || movieObject[key].length === 0){
          delete movieObject[key];
        }
        else if (Array.isArray(movieObject[key])){
          let names = [];
          for (let i = 0; i < movieObject[key].length; i++){
            names.push(movieObject[key][i].name);
          }
          movieObject[key] = names.join(", ");
        }
        else if (typeof movieObject[key] === "object"){
          movieObject[key] = movieObject[key].name;
        }
      }
      // console.log(movieObject.homepage);
      res.render('pages/movie_deeper', {currentMovie: movieObject, imagePath: tmdb_img_path});
    }
    // otherwise show the error returned
    else{
        console.log(`We’ve encountered an error: ${error}`);
      }
  });
  return;
}

function searchAllMovies(res, keywords){

  //add URI encoded movie title to TMDB search request    
  const url = "https://api.themoviedb.org/3/search/movie?api_key=" + env.tmdb_api + "&language=en-US&page=1&include_adult=false&query=" + keywords.split(" ").join("+");

  // request json object from TMDB and retrieve synopsis
  request(url, function(error, response, body){

    // if no error, process data
    if(!error){

      // return response string to JSON object
      const movieObject = JSON.parse(body);
      res.render('pages/index_deeper', {movieDB: movieObject.results, searchResults: true, searchString: keywords, imagePath: tmdb_img_path});
    }
    // otherwise show the error returned
    else{
      console.log(`We’ve encountered an error: ${error}`);
    }
  });
  return;
}