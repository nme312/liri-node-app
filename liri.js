require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

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
    case "do-what-it-says":
        obey();
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
    request(`http://www.omdbapi.com/?t=${movieSearch}&y=&plot=short&apikey=trilogy`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Ratings[0].Value);
            console.log(JSON.parse(body).Ratings[1].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        }
    });
}

function obey() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        console.log(dataArr[0], dataArr[1]);
        process.argv[3] = dataArr[1];
        switch (dataArr[0]) {
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
    });
}

//*TO-WORK*
//add function to switch case statement
//add user input to post
// acount for multiple spaces in user input *could use reduce* *could use for loop found in week-5 activity-18*
// function postTweet() {
//     client.post('statuses/update', { status: 'Has anyone seen T-800 Model 101? I miss him.' }, function (error, tweet, response) {
//         if (error) throw error;
//         console.log(tweet);  // Tweet body.
//         console.log(response);  // Raw response object.
//     });
// }