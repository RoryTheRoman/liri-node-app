require("dotenv").config();
var fs = require("fs");
var request = require("request");
var http = require("http");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var multWords = process.argv;
var userCommand = process.argv[2];
var userInput = process.argv[3]; 

//create a for loop for user input that is more than one word.  this fixes input at the [2] index, but combines input [4] and above.
for (var i = 4; i < multWords.length; i++) {
	userInput = userInput + " " + multWords[i];
}
	

function movie (){

	request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

		if (!error && response.statusCode === 200) {
			console.log("");
			console.log("Title: " + JSON.parse(body).Title);
			console.log("");
			console.log("Year of Release: " + JSON.parse(body).Year);
			console.log("");	    	
			console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
			console.log("");
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)['Ratings'][1]['Value']);
			console.log("");
			console.log("Country: " + JSON.parse(body).Country);
			console.log("");
			console.log("Language: " + JSON.parse(body).Language);
			console.log("");
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("");
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("");
  		}else{
  			return;
  			console.log("");
  			console.log("Your Movie Does Not Exist");
  		}
	});
}
function twatter(){
	var params = {screen_name: 'RoryTheRoman79', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error){
			console.log("");
			console.log("My Tweets");
			console.log("______________")
			for (var i = 0; i < tweets.length; i++){
				console.log("");
				console.log(tweets[i].text);
				console.log("Created: " + tweets[i].created_at);
				console.log("____");
				}
		}else{
			console.log("Oops.  Something broke.  Do you have your own Twitter keys?");
			console.log("You will need to create your own .env file so you can access your Twitter feed.  Error below:");
			console.log("_______")
			console.log(error);
			console.log("");
			return;
		}	
});
}
function spotIt (){
	spotify.search({ type: 'track', query: userInput, limit: 1}, function(err, data) {
		var songData = data.tracks.items[0];
		if (err) {
    		return console.log('Error occurred: ' + err);
		}else{
			console.log("Artist: " + songData.album.artists[0].name); 
			console.log("");
			console.log("Song Title: " + )
			console.log("");
			console.log("Spotify Link: " + )
			console.log("");
			console.log("Album Title: "+ )
		}	
	});
}



switch (userCommand){
	case "my-tweets":
	twatter();
	return;

	case "spotify-this-song":
	spotIt ();
	return;

	case "movie-this":
	movie();
	return;

	case "do-what-it-says":
	bkstBoys ();
	return;
}




//functions for cases:



function bkstBoys (){
	//call up random.txt to get i want it that way displayed
}