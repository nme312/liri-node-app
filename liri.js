require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv[2];

switch (userInput) {
    case "my-tweets":
        getUserTweets();
        break;
}

function getUserTweets() {
    /*COULD WORK IF I FOUND A WAY TO GET TWEET ID'S AND LOOP THROUGH THEM*/
    client.get(`statuses/user_timeline`, { screen_name: `SkyNet10100`, count: 20 }, function (error, tweet, response) {
        if (error) throw error;
        // console.log(tweet);
        for (var i = 0; i < tweet.length; i++){
            console.log(`${tweet[i].text}\n`);
        }
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
