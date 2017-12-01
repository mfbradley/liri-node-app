// VARIABLES
var userCommand = process.argv[2];
var searchItem = process.argv[3];

// pull keys from keys.js and store in variable "keys"
var keys = require("./keys.js");

// TWITTER
// require twitter npm
var Twitter = require('twitter');

//conditions
if (userCommand === "my-tweets") {

    // grab twitter keys from keys.js
    var client = new Twitter(keys.twitterKeys);

    // twitter npm get request
    var params = { screen_name: 'mobradleyy' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }

        // loop over 20 tweets and console log day created and tweet body
        for (var i = 0; i < Math.min(tweets.length, 20); i++) {
            console.log("Day Created: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text);
            console.log("--------------------------------------------");

        }

    });

}

// SPOTIFY
// require spotify npm
var Spotify = require('node-spotify-api');

//pull spotify keys from keys.js
var spotify = new Spotify(keys.spotifyKeys);


//conditions
// if user does NOT enter a song,
if (userCommand === "spotify-this-song" && searchItem === undefined) {

    //spotify npm search request
    spotify.search({ type: 'track', query: "The Sign", limit: 8 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // return information for "The Sign" by Ace of Base"
        // console.log artist, song, preview link, and album name (pull from data object)
        console.log("Artist: " + data.tracks.items[7].album.artists[0].name);
        console.log("Song: " + data.tracks.items[7].name);
        console.log("Preview Link: " + data.tracks.items[7].album.artists[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[7].album.name);

    });

}

// if user does enter a song
else if (userCommand === "spotify-this-song") {


    //spotify npm search request
    spotify.search({ type: 'track', query: searchItem, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // return information for song
        //console log song information: artist, song, preview link, and album name
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    });

}




// OMDB
//require request package
var request = require("request");

//conditions
// if user does NOT enter a movie title
if (userCommand === "movie-this" && searchItem === undefined) {

    var queryUrlOne = "http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=trilogy";

    // api request
    request(queryUrlOne, function(error, response, body) {

        // if the request is successful
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

// if user enters movie title
else if (userCommand === "movie-this") {

    var queryUrlTwo = "http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy";

    request(queryUrlTwo, function(error, response, body) {

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
// require fs package
var fs = require("fs");

// conditions
if (userCommand === "do-what-it-says") {

    // read random.txt file
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        // return data from random.txt and split at the comma
        data = data.split(",");

        // save index1 of the array to a variable (song name)
        searchItem = data[1];

        // spotify search request using the saved item from random.txt
        spotify.search({ type: 'track', query: searchItem, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            //return results (artist, song, preview link, album)
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log("Album Name: " + data.tracks.items[0].album.name);
        });


    });
}
