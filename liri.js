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
        console.log("\n Artist name: " + response.tracks.items[0].album.artists[0].name);
        console.log("\n Song name: " + response.tracks.items[0].name); 
        console.log("\n Album name: " + response.tracks.items[0].album.name); 
        console.log("\n Link Preview: " + response.tracks.items[0].external_urls.spotify); 
    })
    .catch(function (err) {
      console.log(err);
    });
}
function bandsintownOutput(value) {
  let bandsAPIKey = process.env.bandsintown_SECRET;
  let queryURL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=" + bandsAPIKey
  axios.get(queryURL).then(
    function (response) {
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city);
      console.log(moment(response.data[0].datetime).format('MM/DD/YYYY'));
    },

    function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  );
}
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
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );
}
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
