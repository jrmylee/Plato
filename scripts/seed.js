var request = require('request');
var token = "Bearer BQCe6Y7snbBaQtjO0ru272lAGvYzO9KhQ7uZq4tluatmwbDpIN1SDNrZVZ96UQotFCiVn8AshX824jfss3_n4OhGJ-2yQDpPtnHOLlD-ZGqVxUrPvfJ-MSVwnZb2nywNX7JwWIuDQn8BgdAqE9mVpijEnBEeIl0LpsMDE4mX";
var fs = require("fs");

var getAllTracks = function(cb){
    request('https://api.spotify.com/v1/me/tracks', {
        headers: {
            'Authorization': token
        },
    }, (err, response, body) => {
        if(err) return cb(err);
        cb(null, JSON.parse(body));
    })
}

var getSongFeatures = function(ids, cb){
    request({url: 'https://api.spotify.com/v1/audio-features', 
    headers: {
        'Authorization': token
    },
    qs: {ids: ids}}, (err, response, body) => {
        if(err) return cb(err);
        cb(null, JSON.parse(body));
    })
} 

getAllTracks((err, body) => {
    var ids = body.items.map(item => {
        return item.track.id;
    })
    console.log(ids);
    var str = "";
    ids.forEach(id => str += id + ",");
    str = str.substring(0, str.length - 1);
    getSongFeatures(str, (err, features) => {
        fs.writeFile('features.json', JSON.stringify(features), (err) => {
            if(err) return console.log(err);
            console.log('file has been created');
        })
    });
})
