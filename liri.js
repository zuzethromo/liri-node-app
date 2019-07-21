require(".env").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

let doWhatItSays = function(){
    fs.readFile('random.txt', 'utf8', function(err,data) {
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

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);