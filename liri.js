require("dotenv").config();
  var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);
  var userInput = process.argv[2];



switch (userInput){
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
	//get movie here
}
function bkstBoys (){
	//call up random.txt to get i want it that way displayed
}