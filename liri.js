require("dotenv").config(); 

const axios = require("axios");
const keys = require("./keys.js");
const moment = require("moment");
const fs = require("fs");

let command = process.argv[2];
let value = process.argv.slice(3).join(" ");

switch(command){
  case "concert-this":
      bandsintownOutput(value);
    break;
  case "spotify-this-song":
    spotifyOutput(value);
    break;
  case "movie-this":
    omdbOutput(value);
    break;

  case "do-what-it-says":
    doWhatItSays(value);
    break;
}

/*---------SPOTIFY---------- */
function spotifyOutput(value) {
  var Spotify = require('node-spotify-api');

  const spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
  
  if(value === undefined){
    value = "The Sign Ace of Base";
  }

  spotify
    .search({ type: 'track', query: value })
    .then(function (response) {
        console.log("\n Artist name: " + response.tracks.items[0].album.artists[0].name); //artist name
        console.log("\n Song name: " + response.tracks.items[0].name); //song name
        console.log("\n Album name: " + response.tracks.items[0].album.name); //album name
        console.log("\n Link Preview: " + response.tracks.items[0].external_urls.spotify); //preview link 
    })
    .catch(function (err) {
      console.log(err);
    });
}

/*---------Bandsintown---------- */
function bandsintownOutput(value) {
  let bandsAPIKey = process.env.bandsintown_SECRET;
  let queryURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=" + bandsAPIKey
  //example: https://rest.bandsintown.com/artists/Marshmellow/events?app_id=
  axios.get(queryURL).then(
    function (response) {
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city);
      console.log(moment(response.data[0].datetime).format('MM/DD/YYYY')); //use moment to format "MM/DD/YYYY"
    },

    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  );
}

  /*---------OMDB Movies---------- */
function omdbOutput(value) {
  if(value === ""){
     value = "Mr.Nobody";
  }
  let OMDBapikey = process.env.OMDB_SECRET;
  let queryURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=" + OMDBapikey
  axios
    .get(queryURL)
    .then(
      function (response) {
        
        if(value ==="Mr.Nobody"){
          console.log("\nIf you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/\nIt's on Netflix!");
        }
        else{
          console.log("\nTitle of the Movie: " + response.data.Title);
          console.log("\nYear of the Movie: " + response.data.Year);
          console.log("\nIMDB rating of the Movie: " + response.data.imdbRating);
          console.log("\nRotten Tomatoes Rating of the Movie: " + response.data.Ratings[1].Value);
          console.log("\nCountry production of the Movie: " + response.data.Country);
          console.log("\nLanguage/s of the Movie: " + response.data.Language);
          console.log("\nPlot of the Movie: " + response.data.Plot);
          console.log("\nActors in the Movie: " + response.data.Actors);
        }
      },

      function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );
}
  
/*---------do-what-it-says ---------- */
function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function (err, data) {
    
    if (err) {
      return console.log(err);
    }

    data = data.split(",");
    switch (data[0]) {
      case "concert-this":
          bandsintownOutput(data[1]);
        break;
      case "spotify-this-song":
        spotifyOutput(data[1]);
        break;
      case "movie-this":
        omdbOutput(data[1]);
        break;
    }
  });
}
























// require("dotenv").config();
// let keys = require('./keys.js');
// // let spotify = require('spotify');
// let spotify = new Spotify(keys.spotify);
// let request = require('request');

// let getArtistNames = function(artist) {
//     return artist.name;
// }

// let getMeSpotify = function(songName) {

//     spotify.search({ type: 'track', query: songName }
//     , function(err, data) {
//         if ( err ) {
//             console.log('Error occurred: ' + err);
//             return;
//         }

//         let songs = data.tracks.items;
//         for (let i=0; i<songs.length; i++) {
//             console.log(i);
//             console.log('artist(s): ' + songs[i].artists.map (
//                 getArtistNames));
//             console.log('song name: ' + songs[i].name);
//             console.log('preview song: ' + songs[i].preview_url);
//             console.log('album: ' + songs[i].album.name);
//             console.log('----------------');
//         }
//     });
// }

// let getMeMovie = function(movieName) {
//     request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body){
//         if (!error && response.statusCode == 200) {
            
//             let jsonData = JSON.parse(body);
//             console.log('Title: ' + jsonData.Title);
//             console.log('Year: ' + jsonData.Year);
//             console.log('Rated: ' + jsonData.Rated);
//             console.log('IMDB Rating: ' + jsonData.imdbRating);
//             console.log('Country: ' + jsonData.Country);
//             console.log('Language: ' + jsonData.Language);
//             console.log('Plot: ' + jsonData.Plot);
//             console.log('Actors: ' + jsonData.Actors);
//             console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
//             console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
//         }
//     });
// }

// let doWhatItSays = function() { 
//     fs.readFile('random.txt', 'utf8', function (err, data) {
//     if (err) throw err;
    
//     let dataArr = data.split(',');

//     if (dataArr.length == 2) {
//         pick(dataArr[0], dataArr[1]);
//     }
//     else if (dataArr.length == 1) {
//         pick(dataArr[0]);
//     }
//     });
// }

// let pick = function(caseData, functionData) {
//     switch(caseData) {
//         case 'spotify-this-song':
//             getMeSpotify(functionData);
//             break;
//         case 'movie-this' :
//             getMeMovie(functionData);
//         case 'do-what-it-says':
//             doWhatItSays();
//             break;
//         default: 
//         console.log('LIRI does not know that');
//     }
// }

// let runThis = function(argOne, argTwo) {
//     pick(argOne, argTwo);
// };

// runThis(process.argv[2], process.argv[3]);