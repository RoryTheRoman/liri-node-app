//Require all of the stuffs:
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var http = require("http");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//defining user inputs:
var multWords = process.argv;
var userCommand = process.argv[2];
var userInput = process.argv[3];

//setting defaults if no movie or song entered:
if (userCommand === "movie-this" && !userInput){
	console.log("");
	console.log("You didn't specify movie!  Watch this:");
	userInput = "Mr Nobody";
}
if (userCommand === "spotify-this-song" && !userInput){
	console.log("You didn't specify a song! It's ok. We know you love Ace of Base");
	userInput = "The Sign Ace of Base";
}
//allowing for no command to be entered:
if (!userCommand || userCommand !== "my-tweets" && userCommand !== "spotify-this-song" && userCommand !== "movie-this" && userCommand !== "do-what-it-says"){
	console.log("You got to use one of the right commands, yo.  Check the README.");
	return;
}

//create a for loop for user input that is more than one word.  userInput is defined at index[3], so this adds input [4] and above.
for (var i = 4; i < multWords.length; i++) {
	userInput = userInput + " " + multWords[i];
}
//movie-this function:
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
//my-tweets function:
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
//spotify-this-song function:
function spotIt (){
	spotify.search({ type: 'track', query: userInput, limit: 1}, function(err, data) {
		var songData = data.tracks.items[0];
		if (err) {
    		return console.log('Error occurred: ' + err);
		}else{
			console.log("");
			console.log("Artist: " + songData.album.artists[0].name); 
			console.log("");
			console.log("Song Title: " + songData.name);
			console.log("");
			console.log("Spotify Link: " + songData.album.external_urls.spotify);
			console.log("");
			console.log("Album Title: " + songData.album.name);
			console.log("");
			console.log("NEW SEARCH??")
			console.log("");			
		}	

	});
}
//do-what-it-says function:
function bkstBoys (){
	//call up random.txt to get i want it that way displayed
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		  }
		var dataArray = data.split(",");
		var userCommand = dataArray[0];
		var updtUserInput = dataArray[1];
		function newSpotIt (){
			spotify.search({ type: 'track', query: updtUserInput, limit: 1}, function(err, data) {
				var songData = data.tracks.items[0];
				if (err) {
					return console.log('Error occurred: ' + err);
				}else{
					console.log("");
					console.log("Artist: " + songData.album.artists[0].name); 
					console.log("");
					console.log("Song Title: " + songData.name);
					console.log("");
					console.log("Spotify Link: " + songData.album.external_urls.spotify);
					console.log("");
					console.log("Album Title: " + songData.album.name);
					console.log("");
					console.log("NEW SEARCH??")
					console.log("");			
				}	
			});
		}
		newSpotIt();		
	});
}
//function to log text to the log.txt file:
function logText (){
	fs.appendFile("log.txt", userInput + ",", function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("****Your Search Term has been Logged****");
		console.log("BIG BROTHER IS WATCHING");
		console.log("");
	});
}
//calling all the functions based on the userCommand entered, using switch/case:
switch (userCommand){
	case "my-tweets":
	twatter();
	return;

	case "spotify-this-song":
	spotIt ();
	logText();
	return;

	case "movie-this":
	movie();
	logText();
	return;

	case "do-what-it-says":
	bkstBoys ();
	return;
}

//the end.

