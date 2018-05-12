require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var OMDB = require("omdb");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = new OMDB(keys.omdb);

var userInput = process.argv[2];

switch (userInput) {
    case "my-tweets":
        getUserTweets();
        break;
    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        getMovie();
        break;
}

function getUserTweets() {
    /*COULD WORK IF I FOUND A WAY TO GET TWEET ID'S AND LOOP THROUGH THEM*/
    client.get(`statuses/user_timeline`, { screen_name: `SkyNet10100`, count: 20 }, function (error, tweet, response) {
        if (error) throw error;
        // console.log(tweet);
        for (var i = 0; i < tweet.length; i++) {
            console.log(`${tweet[i].text}\n`);
        }
    });
}

function spotifySong() {
    var spotifySearch = process.argv[3];
    for (var i = 4; i < process.argv.length; i++) {
        spotifySearch += ` ${process.argv[i]}`;
    }
    spotify.search({ type: 'track', query: spotifySearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].external_urls.spotify);
        console.log(data.tracks.items[0].album.name);
    });
}

function getMovie() {
    var movieSearch = process.argv[3];
    for (var i = 4; i < process.argv.length; i++) {
        movieSearch += ` ${process.argv[i]}`;
    }
    omdb.get({ title: movieSearch}, true, function (err, movie) {
        if (err) {
            return console.error(err);
        }

        if (!movie) {
            return console.log('Movie not found!');
        }

        console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
        console.log(movie.plot);

        // Saw (2004) 7.6/10
        // Two men wake up at opposite sides of a dirty, disused bathroom, chained
        // by their ankles to pipes. Between them lies...
    });

}



































//*TO-WORK*
//add function to switch case statement
//add argument to function
// acount for multiple spaces in argument *could use reduce* *could use for loop found in week-5 activity-18*
// function postTweet() {
//     client.post('statuses/update', { status: 'Has anyone seen T-800 Model 101? I miss him.' }, function (error, tweet, response) {
//         if (error) throw error;
//         console.log(tweet);  // Tweet body.
//         console.log(response);  // Raw response object.
//     });
// }
