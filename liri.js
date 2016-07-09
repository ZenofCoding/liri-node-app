//Need to figure out why my consumer key won't load.


//npm request
var fs = require('fs');

//require the keys.js file
var keys = require('./keys.js');

//npm twitter
var twitter = require ("twitter");

//npm spotify
var spotify = require("spotify");

//access omdb (could not accuess omdb)
//var omdb = require("omdb");

//retrieve http calls
var request = require('request');



//input arguement 
var command = process.argv[2];
var type = process.argv.splice(3, process.argv.length-1).join(' ');;

//Could not access consumer key
var client = new twitter (keys.twitterKeys)({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: tokenKey,
  access_token_secret: tokenSecret
});


if (type == "tweets") {
  var params = { screen_name: 'thesonderers' };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      if (process.argv[3] == undefined) {
        for (i = 0; i < 20; i++) {
          console.log("\n@thesonderers: " + "\n" + tweets[i] + "\n")
        }
      } else {
        for (i = 0; i < process.argv[3]; i++) {
          console.log("\n@thesonderers said: " + "\n" + tweets[i] + "\n")
        };
      };
    };
  });
};

if (type == "spotify") {
  var songTitle = process.argv[3]
  if (songTitle === undefined) {
    songTitle = "what's my age again";
  }
  spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }
    var items = data.tracks.items;
    for (i = 0; i < items.length; ++i) {
      console.log("\n" + "Song information for query" + ": " + '"' + songTitle + '"' + ".");
      console.log("Song Name: " + items[i]);
      for (k = 0; j < items[i].artists.length; ++j) {
        console.log("Artist: ".bold.green + items[i].artists[j].name.red);
      }
      console.log("Album Name: " + items[i]);

      console.log("Spotify Link: " + items[i]);
    }
    console.log("\n");

  });
};

if (type == "movie") {
  var movie = process.argv[3];
  if (movie == undefined) {
    movie = "Coherence"
  }
  request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r==json', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      console.log("\nTitle:" + json.Title);
      console.log("Year:" + json.Year);
      console.log("IMDB Rating:" + json.imdbRating);
	  console.log("Plot:" + json.Plot);
   
    };
  });
};