# liri-node-app

This is a node.js application that must be run from the command line in Terminal, Explorer, etc.

This application will take in one of four commands, and will do one of the four following things:

    -Command 1, do-what-it-says, will give you information for the song "I Want it That Way."  Why you would want it that way, I'm not sure.
    -Command 2, my-tweets, will display MY 20 most recent tweets
    -Command 3, spotify-this-song will search for a track of your choice on Spotify and return info about that song.
    -Command 4, movie-this, will return information about a movie of your choice

To run the program from the command line, make sure you are running the program by typing in node liri.js.  Following this you will enter the command, and following that you will enter your serach terms of choice (no search terms needed for Command 1 or 2 above.)

Examples:  To show tweets, type the following into the command line:  node liri.js my-tweets
           To search for the movie clue, type the following into the command line:  node liri.js movie-this clue

***PLEASE NOTE:  This application is dependent on Twitter and Spotify keys that are hidden.  You will need your own .env file with your own Twitter and Spotify Keys for those functions to work.                    


