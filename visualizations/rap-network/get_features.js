var rapgeniusClient = require("rapgenius-js");

var re = /\(Ft\..+?\)/i; 

function match(re, str) {
    var m;
     
    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
    }
    return m;
}


function getCollabs(songName) {
    var m = match(re, songName);
    if (m) {
        var collabs = m[0];
        collabs = collabs.substr(5, collabs.length - 6);
        console.log(collabs)
    } else {
        console.log("No features", songName)
    }
}

rapgeniusClient.searchArtist("Jay Z", "rap", function(err, artist){
  if(err){
    console.log("Error: " + err);
  }else{
    console.log(artist.songs.length)
    for (var i = 0, l = artist.songs.length; i < l; i ++) {
        var song = artist.songs[i];
        getCollabs(song.name)
    }
  }
});
