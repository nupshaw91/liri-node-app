require("dotenv").config();
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment")

var argOne = process.argv[2];
var argTwo = process.argv.slice(3).join(" ")
// concert this
function liriRun(argOne, argTwo) {
    console.log("concert-this")


    // Spotify this - song
    spotify
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });

    // movie this
    function name() {
        console.log("Movie-this")
    }
    // do what it says
    function name() {
        console.log("Do what it says")
    }
}