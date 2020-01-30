require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var argOne = process.argv[2];
var argTwo = process.argv.slice(3).join(" ");

// console.log(argOne);
// console.log(argTwo);

function liriRun(argOne, argTwo) {


    switch(argOne) {
        case "spotify-this-song":
        getSpotify(argTwo);
        break;
        case "concert-this":
        getBandsInTown(argTwo);
        break;
        case "movie-this":
        getOMDB(argTwo);
        break;
        case "do-what-it-says":
        getRandom(argTwo);
        break;
        default:
            console.log("Please enter thr following commands: 'cnert-this,spotift-this");
    };
    


    // Spotify this - song

    function getSpotify(songTitle) {
        var spotify = new Spotify(keys.spotify);
        if (!songTitle){
            songTitle = "The Sign";
        };

        spotify.search({type: 'track', query: songTitle}, function (err, data) {
            if (err){
                console.log("Error: " + err)
            }
            console.log("-----------------------")
    
            console.log("Artist(s) Name: " +data.tracks.items[0].album.artists[0].name + "\r\n");
            console.log("Song Name: " +data.tracks.items[0].name + "\r\n");
            console.log("Song Preview Link: " +data.tracks.items[0].href + "\r\n");
            console.log("Album: " +data.tracks.items[0].album.name + "\r\n");

            var songLogged = "\n------Song Logged-------" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\r\n";

            fs.appendFile("log.txt", songLogged, function (err) {
                
            });
        });
    };
    
    function getBandsInTown(artist) {
        var artist = argTwo;
        var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(bandQueryURL).then(
            function (response) {

                console.log("-----------------------")

            console.log("Name of Venue: " + response.data[0].venue.name + "\r\n");
            console.log("Venue Loction: " + response.data[0].venue.city + "\r\n");
            console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");



            var concertLogged = "\n-------Concert Logged--------" + "\nName of the music Artist: " + artist + "\r\n";

            fs.appendFile("log.txt", concertLogged, function (err) {
                
            });
                
            });
        
    };

    // movie this
    function getOMDB(movie) {
if (!movie){
    movie = "Mr Nobody";
}
var movieQueryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
        axios.request(movieQueryURL).then(
            function (response) {

                console.log("-----------------------")

            console.log("Movie Title: " + response.data.Title + "\r\n");
            console.log("Year of Release: " + response.data.Year + "\r\n");
            console.log("IMDB Raiting: " + response.data.imdbRating + "\r\n");
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value + "\r\n");
            console.log("Country Where Produced: " +response.data.Country + "\r\n");
            console.log("Language: " + response.data.Lanuage + "\r\n");
            console.log("Plot: " + response.data.Plot + "\r\n");
            console.log("Actors: " + response.data.Actors + "\r\n");
           

            var movieLogged = "\n--------Movie Logged---------" + "\nMoive title: " + response.data.Title + "\r\nYear of Release: " + response.data.Year;

            fs.appendFile("log.txt", movieLogged, function (err) {
                if(err) throw err;
            });
    });
   
};
   
    function getRandom() {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err){
                return console.log(err);
            }else{
                console.log(data);
                var randomInfo =data.split(",");
                liriRun(randomInfo[0], randomInfo[1]);
            };
        });
    };


    
    
};
liriRun(argOne, argTwo);