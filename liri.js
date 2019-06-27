//Node + NPM variables
const axios = require('axios');
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//User Global Variables
var userCommand = process.argv[2];
var arr = [];
if(process.argv > 3){
    var userInput = process.argv.slice(3).join("+");
}

switch(userCommand){
    case "concert-this":
        concertThis()
        break;
    case "spotify-this-song":
        spotifyThis()
        break;
}


function concertThis(){
    axios({
        method: 'GET',
        url: "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
      })
    .then(function (response) {
        arr = response.data;
        concertLogger(arr);
    });
}

function concertLogger(log){
    var i = 0;
    while(i < log.length){
        console.log("Concert:")
        console.log("Venue Name: " +log[i].venue.name);
        console.log("\nVenue Location: " + log[i].venue.city +", " + log[i].venue.country)
        console.log("\nConcert Date: " + dateConvert(i) +"\n------------")
        i++
    }
}



function dateConvert(loop){
    var date = arr[loop].datetime.substring(0,arr[loop].datetime.indexOf("T"))
    var month = date.substring(5,6);
    var day = date.substring(8,9);
    var year = date.substring(0,3);
    return month + "/" + day + "/" + year;

}

function spotifyThis(){
    if(userInput){
        spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log(data); 
          });
    } else{
        spotify.search({ type: 'track', query: 'the Sign' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log(data.tracks.items[2].artists); 
          });
    }
}