let keys = require('./keys.js');
let spotify = require('spotify');
let request = require('request');

let getArtistNames = function(artist) {
    return artist.name;
}

let getMeSpotify = function(songName) {

    spotify.search({ type: 'track', query: songName }
    , function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        let songs = data.tracks.items;
        for (let i=0; i<songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map (
                getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('----------------');
        }
    });
}

let getMeMovie = function(movieName) {
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body){
        if (!error && response.statusCode == 200) {
            
            let jsonData = JSON.parse(body);
            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imdbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        }
    });
}

let doWhatItSays = function() { 
    fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) throw err;
    
    let dataArr = data.split(',');

    if (dataArr.length == 2) {
        pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length == 1) {
        pick(dataArr[0]);
    }
    });
}

let pick = function(caseData, functionData) {
    switch(caseData) {
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this' :
            getMeMovie(functionData);
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default: 
        console.log('LIRI does not know that');
    }
}

let runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);