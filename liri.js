require("dotenv").config();
// var request = require("request");
// var twitter = require("twitter");
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
var userCommand = process.argv[2];
var userInput = process.argv[3];
var request = require("request");


switch (userCommand){
	case "my-tweets":
	twatter();

	case "spotify-this-song":
	spotify ();

	case "movie-this":
	movie();

	case "do-what-it-says":
	bkstBoys ();
}




//functions for cases:

function twatter () {
	//get tweets here
}
function spotify (){
	//get spotify API here
}
function movie (){
	request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

		if (!error && response.statusCode === 200) {
			console.log(JSON.parse(body));
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year of Release: " + JSON.parse(body).Year);	    	
			console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)['Ratings'][1]['Value']);
			console.log();
			console.log();
			console.log();
			console.log();
			console.log();
  		}
});
}
function bkstBoys (){
	//call up random.txt to get i want it that way displayed
}