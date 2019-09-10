let keys = require('./keys.js');
let spotify = require('spotify');

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


let pick = function(caseData, functionData) {
    switch(caseData) {
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        default: 
        console.log('LIRI does not know that');
    }
}

let runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);