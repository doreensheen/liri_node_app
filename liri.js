require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");

// ------------------------------------------------------------------------------------
// Program Flow
var commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];
var command = process.argv[2];
var search = process.argv[3];

if (command === commands[0]) {
    myTweets();
}else if (command === commands[1]){
    spotifyThisSong(search);
}else if (command === commands[2]){
    movieThis(search);
}else if (command === commands[3]){
    doWhatItSays();
}

// ------------------------------------------------------------------------------------
// Command Functions

    // Run my-tweets
    function myTweets() {
        console.log("my-tweets called")

        function Twitter(key) {
            this.key = key;
        }
        
        var client = new Twitter(keys.twitter);
    }
    // Run spotify-this-song
    function spotifyThisSong(search) {
        // require and get keys for spotify api
        var Spotify = require('node-spotify-api');
        function Spotify(key) {
            this.key = key;
        }
        var spotify = new Spotify(keys.spotify);

        // function variables
        var songSearch = search;
        // call api and return requested info
        spotify
            .request('https://api.spotify.com/v1/search?q=' + songSearch + '&type=track&limit=5')
            .then(function(data) {
                console.log("\nHere are 5 tracks with that name. Which one do you want to hear?")
                for (i=0;i<5;i++) {
                    console.log("---")
                    console.log(data.tracks.items[i].name); 
                    console.log("By " + data.tracks.items[i].artists[0].name); 
                    console.log("Album: " + data.tracks.items[i].album.name); 
                    console.log("Link to Spotify Track: " + data.tracks.items[i].external_urls.spotify); 
                }
            })
            .catch(function(err) {
                console.error('Error occurred: ' + err); 
            });
    }
    // Run movie-this
    function movieThis(search) {
        var movieSearch = search;
        // Run a request to the OMDB API with the movie specified
        request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body).Title);
                console.log(JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log(JSON.parse(body).Country);
                console.log(JSON.parse(body).Language);
                console.log(JSON.parse(body).Plot);
                console.log(JSON.parse(body).Actors);
            }
        });
    }
    // Run do-what-it-says
    function doWhatItSays() {
        console.log("do-what-it-says called")
    }