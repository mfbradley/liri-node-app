// VARIABLES
var userCommand = process.argv[2];
var searchItem = process.argv[3];


// TWITTER
var keys = require("./keys.js");
var Twitter = require('twitter');

if (userCommand === "my-tweets") {

    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: 'mobradleyy' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }

        for (var i = 0; i < Math.min(tweets.length, 20); i++) {
            console.log("Day Created: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text);
            console.log("--------------------------------------------");

        }

    });

}

// SPOTIFY

var Spotify = require('node-spotify-api');

//SPOTIFY KEY
var spotify = new Spotify(keys.spotifyKeys);


//CONDITIONS
// RUN WITHOUT INPUT
if (userCommand === "spotify-this-song" && searchItem === undefined) {



    spotify.search({ type: 'track', query: "The Sign", limit: 8 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        console.log("Artist: " + data.tracks.items[7].album.artists[0].name);
        console.log("Song: " + data.tracks.items[7].name);
        console.log("Preview Link: " + data.tracks.items[7].album.artists[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[7].album.name);

    });

}

// RUN WITH INPUT
else if (userCommand === "spotify-this-song") {



    spotify.search({ type: 'track', query: searchItem, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console log results
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    });

}




// OMDB
//REQUIRE REQUEST
var request = require("request");

//CONDITIONS
if (userCommand === "movie-this" && searchItem === undefined) {

    var queryUrl = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {


        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

}

else if (userCommand === "movie-this") {

    var queryUrl = "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }

    });

}

// DO WHAT IT SAYS
// REQUIRE FS
var fs = require("fs");

if (userCommand === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        data = data.split(",");

        searchItem = data[1];


        spotify.search({ type: 'track', query: searchItem, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }


            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log("Album Name: " + data.tracks.items[0].album.name);
        });


    });
}
