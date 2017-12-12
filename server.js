// initialize Express in project
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8080;

// set 'ejs' as template source for view engine
app.set('view engine', 'ejs');

// set public as folder to target for all static assets
app.use(express.static('public'));

// if 'server' is targeted without parameters
// render pages/index
app.get('/', (req, res) => {
    res.render('pages/index', {movieDB: getMovies(), searchResults: false});
})

// if 'server/movie' is targeted with a movieId as parameter
// render pages/movie with data of specfic movie
app.get('/movie/:movieId', (req, res) => {
  const movieItem = getMovies().find((item) => item.id === req.params.movieId);
  res.render('pages/movie', {currentMovie: movieItem});
})

// if 'server/search' is targeted with title keywords as parameters
// render pages/index with movies matching search parameters
app.get('/search', (req, res) => {
  const keywords = req.query.keywords;
  const movieList = findThis(keywords, 'title');
  // const movieList = getMovies().filter(movieObject => movieObject.title.toLowerCase().includes(req.query.keywords.toLowerCase()));
  res.render('pages/index', {movieDB: movieList, searchResults: true, searchString: keywords});
})

// start Express on port 8080
app.listen(port, () => {
	console.log('Server Started on http://localhost:' + port);
	console.log('Press CTRL + C to stop server');
});

// Function that search and find all movies with particular word in title
function findThis(searchString, key) {
  const searchWords = searchString.split(" ");
  let movieDB = getMovies();
  for (let i = 0; i < searchWords.length; i++){
    // console.log('searching', searchWords[i]);
    let subMovieDB = [];
    for (let j = 0; j < movieDB.length; j++){
      // console.log(movieDB[j].title);
      if (movieDB[j].title.toLowerCase().includes(searchWords[i].toLowerCase())){
        // console.log('Found', searchWords[i]);
        subMovieDB.push(movieDB[j]);
      }
    }
    movieDB = subMovieDB;
  }
  return movieDB;
}

// Function that returns an array of movie objects
function getMovies() {
    return [{
      title: "The Matrix",
      year: "1999",
      rated: "R",
      released: "31 Mar 1999",
      runtime: "136 min",
      genre: "Action, Sci-Fi",
      director: "Andy Wachowski, Lana Wachowski",
      writer: "Andy Wachowski, Lana Wachowski",
      actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving",
      plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      language: "English",
      country: "USA, Australia",
      awards: "Won 4 Oscars. Another 34 wins & 40 nominations.",
      poster: "http://i.imgur.com/fAWwkMI.jpg",
      metascore: "73",
      imdbRating: "8.7",
      imdbVotes: "1037112",
      id: "tt0133093",
      type: "movie"
    }, {
      title: "Looper",
      year: "2012",
      rated: "R",
      released: "28 Sep 2012",
      runtime: "119 min",
      genre: "Action, Crime, Sci-Fi",
      director: "Rian Johnson",
      writer: "Rian Johnson",
      actors: "Joseph Gordon-Levitt, Bruce Willis, Emily Blunt, Paul Dano",
      plot: "In 2074, when the mob wants to get rid of someone, the target is sent into the past, where a hired gun awaits - someone like Joe - who one day learns the mob wants to 'close the loop' by sending back Joe's future self for assassination.",
      language: "English, French",
      country: "USA, China",
      awards: "15 wins & 37 nominations.",
      poster: "http://i.imgur.com/ad02q4a.jpg",
      metascore: "84",
      imdbRating: "7.5",
      imdbVotes: "377691",
      id: "tt1276104",
      type: "movie"
    }, {
      title: "TRON: Legacy",
      year: "2010",
      rated: "PG",
      released: "17 Dec 2010",
      runtime: "125 min",
      genre: "Action, Adventure, Sci-Fi",
      director: "Joseph Kosinski",
      writer: "Edward Kitsis (screenplay), Adam Horowitz (screenplay), Edward Kitsis (story), Adam Horowitz (story), Brian Klugman (story), Lee Sternthal (story), Steven Lisberger (characters), Bonnie MacBird (characters)",
      actors: "Jeff Bridges, Garrett Hedlund, Olivia Wilde, Bruce Boxleitner",
      plot: "The son of a virtual world designer goes looking for his father and ends up inside the digital world that his father designed. He meets his father's corrupted creation and a unique ally who was born inside the digital world.",
      language: "English",
      country: "USA",
      awards: "Nominated for 1 Oscar. Another 10 wins & 39 nominations.",
      poster: "http://i.imgur.com/Smd2JFm.jpg",
      metascore: "49",
      imdbRating: "6.8",
      imdbVotes: "241380",
      id: "tt1104001",
      type: "movie"
    }, {
      title: "Inception",
      year: "2010",
      rated: "PG-13",
      released: "16 Jul 2010",
      runtime: "148 min",
      genre: "Action, Mystery, Sci-Fi",
      director: "Christopher Nolan",
      writer: "Christopher Nolan",
      actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
      plot: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      language: "English, Japanese, French",
      country: "USA, UK",
      awards: "Won 4 Oscars. Another 153 wins & 171 nominations.",
      poster: "http://i.imgur.com/cF3DFGi.jpg",
      metascore: "74",
      imdbRating: "8.8",
      imdbVotes: "1236546",
      id: "tt1375666",
      type: "movie"
    }, {
      title: "Source Code",
      year: "2011",
      rated: "PG-13",
      released: "1 Apr 2011",
      runtime: "93 min",
      genre: "Mystery, Sci-Fi, Thriller",
      director: "Duncan Jones",
      writer: "Ben Ripley",
      actors: "Jake Gyllenhaal, Michelle Monaghan, Vera Farmiga, Jeffrey Wright",
      plot: "A soldier wakes up in someone else's body and discovers he's part of an experimental government program to find the bomber of a commuter train. A mission he has only 8 minutes to complete.",
      language: "English",
      country: "USA, Canada",
      awards: "1 win & 5 nominations.",
      poster: "http://i.imgur.com/wWuxzLe.jpg",
      metascore: "74",
      imdbRating: "7.5",
      imdbVotes: "327161",
      id: "tt0945513",
      type: "movie"
    }, {
      title: "Hackers",
      year: "1995",
      rated: "PG-13",
      released: "15 Sep 1995",
      runtime: "107 min",
      genre: "Comedy, Crime, Drama",
      director: "Iain Softley",
      writer: "Rafael Moreu",
      actors: "Jonny Lee Miller, Angelina Jolie, Jesse Bradford, Matthew Lillard",
      plot: "A young boy is arrested by the U.S. Secret Service for writing a computer virus and is banned from using a computer until his 18th birthday. Years later, he and his new-found friends ...",
      language: "English, Italian, Japanese, Russian",
      country: "USA",
      awards: "N/A",
      poster: "http://i.imgur.com/njaHNJn.jpg",
      metascore: "46",
      imdbRating: "6.2",
      imdbVotes: "49883",
      id: "tt0113243",
      type: "movie"
    }, {
      title: "The Social Network",
      year: "2010",
      rated: "PG-13",
      released: "1 Oct 2010",
      runtime: "120 min",
      genre: "Biography, Drama",
      director: "David Fincher",
      writer: "Aaron Sorkin (screenplay), Ben Mezrich (book)",
      actors: "Jesse Eisenberg, Rooney Mara, Bryan Barter, Dustin Fitzsimons",
      plot: "Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the cofounder who was later squeezed out of the business.",
      language: "English, French",
      country: "USA",
      awards: "Won 3 Oscars. Another 166 wins & 132 nominations.",
      poster: "http://i.imgur.com/jC86duZ.jpg",
      metascore: "95",
      imdbRating: "7.8",
      imdbVotes: "414791",
      id: "tt1285016",
      type: "movie"
    }, {
      title: "The Imitation Game",
      year: "2014",
      rated: "PG-13",
      released: "25 Dec 2014",
      runtime: "114 min",
      genre: "Biography, Drama, Thriller",
      director: "Morten Tyldum",
      writer: "Graham Moore, Andrew Hodges (book)",
      actors: "Benedict Cumberbatch, Keira Knightley, Matthew Goode, Rory Kinnear",
      plot: "During World War II, mathematician Alan Turing tries to crack the enigma code with help from fellow mathematicians.",
      language: "English, German",
      country: "UK, USA",
      awards: "Won 1 Oscar. Another 51 wins & 125 nominations.",
      poster: "http://i.imgur.com/HM4iaQy.jpg",
      metascore: "73",
      imdbRating: "8.1",
      imdbVotes: "278826",
      id: "tt2084970",
      type: "movie"
    }, {
      title: "Office Space",
      year: "1999",
      rated: "R",
      released: "19 Feb 1999",
      runtime: "89 min",
      genre: "Comedy",
      director: "Mike Judge",
      writer: "Mike Judge (Milton animated shorts), Mike Judge (screenplay)",
      actors: "Ron Livingston, Jennifer Aniston, David Herman, Ajay Naidu",
      plot: "Three company workers who hate their jobs and decide to rebel against their greedy boss.",
      language: "English",
      country: "USA",
      awards: "2 nominations.",
      poster: "http://i.imgur.com/bBt7i2d.jpg",
      metascore: "68",
      imdbRating: "7.8",
      imdbVotes: "182428",
      id: "tt0151804",
      type: "movie"
    }, {
      title: "Ex Machina",
      year: "2015",
      rated: "R",
      released: "24 Apr 2015",
      runtime: "108 min",
      genre: "Drama, Sci-Fi",
      director: "Alex Garland",
      writer: "Alex Garland",
      actors: "Domhnall Gleeson, Corey Johnson, Oscar Isaac, Alicia Vikander",
      plot: "A young programmer is selected to participate in a breakthrough experiment in artificial intelligence by evaluating the human qualities of a breathtaking female A.I.",
      language: "English",
      country: "UK",
      awards: "1 win & 2 nominations.",
      poster: "http://i.imgur.com/uN0Y2ZV.jpg",
      metascore: "78",
      imdbRating: "7.8",
      imdbVotes: "82581",
      id: "tt0470752",
      type: "movie"
    }]
}