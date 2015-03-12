'use strict';

var _ = require('lodash');
var Song = require('./song.model');
var echojs = require('echojs');
var SpotifyWebApi = require('spotify-web-api-node');
var async = require('async');
var request = require('request');

var echo = echojs({
  key: process.env.TMPCI7QSDBSYVWE0C
});

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'f22ac7cc5c9547af862a6446ccb81ac0',
  clientSecret : 'a0d2f84e34784a48bcd7c4f53640bc79',
  redirectUri : 'http://localhost:8888/callback'
});

//get list of artist names by keyword search
exports.searchArtistId = function(req, res){
  spotifyApi.searchArtists(req.query.name)
  .then(function(data) {
      // console.log('Search by "Love"', data);
      res.json(data);
    }, function(err) {
      console.error(err);
    });
};

//get list of albums by artist ID 
exports.getAlbumsById = function(req, res){
  spotifyApi.getArtistAlbums(req.query.id)
  .then(function(data) {
    res.json(data);
  }, function(err) {
    console.error(err);
  });
};

exports.getTracksById = function(req, res) {
  spotifyApi.getAlbumTracks(req.query.id)
  .then(function(data) {
    // console.log(data)
    async.mapSeries(data.items, echoRequest, function(err, results){
      // console.log(results)
      res.json(results);
    });
  }, function(err) {
    console.error(err);
  });
};

exports.analyzeTrack = function(req, res) {
  // console.log("this is going into echo query backend:", req.query.id)
  var result = echoAnalyze(req.body.analysis_url,function(err, result){
    // console.log(result);
    console.log('worked');
    res.json(result);

  });
};

function echoRequest(item, callback){
  request.get('http://developer.echonest.com/api/v4/song/profile?api_key=U4VO60SOCU6NL8NNN&track_id=spotify:track:' + item.id + '&bucket=id:spotify&bucket=audio_summary', function (error, response, body) {
    callback(null, body);
  });
}

function echoAnalyze(item, callback){
  console.log("GOT HERE", item)
  request.get(item, function (error, response, body) {
    console.log(body)
    callback(null,body)
  if (!error && response.statusCode == 200) {
     // Print the google web page.
  }
})
}




// function echoAnalyze(item, callback){

//     request(item, function (error, response, body) {
//       callback(null, body);
//     //   if (!error && response.statusCode == 200) {
//     //   console.log(body) // Print the google web page.
//     // }
//   })
// }

// exports.getAlbumTracks = function(req, res) {
//   console.log(req.body)
//   // res.send('hi')
//   spotifyApi.setAccessToken(req.user.accessToken);
//   console.log(req.user.spotify);
//   console.log(req.query)
//   spotifyApi.getAlbumTracks(req.query.id)
//     .then(function(data) {
//       async.mapSeries(data.items, echoReq, function(err, results){
//         res.send(results);
//       });
//       // myfunc ( el, mycb2(err, el){albumData.push(el)} ) {//req.get, mycb2(response)} `
//       // mycallback (err, results) {res.send(results)}

//     }, function(err) {
//       console.error(err);
//     });
// }



// exports.analyzeTopTracks = function(req, res){


// spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy')




// Get list of songs
exports.index = function(req, res) {
  console.log("got here")
  Song.find(function (err, songs) {
    if(err) { return handleError(res, err); }
    return res.json(200, songs);
  });
};

// Get a single song
exports.show = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    return res.json(song);
  });
};

// Creates a new song in the DB.
exports.create = function(req, res) {
  Song.create(req.body, function(err, song) {
    if(err) { return handleError(res, err); }
    return res.json(201, song);
  });
};

// Updates an existing song in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Song.findById(req.params.id, function (err, song) {
    if (err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    var updated = _.merge(song, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, song);
    });
  });
};

// Deletes a song from the DB.
exports.destroy = function(req, res) {
  Song.findById(req.params.id, function (err, song) {
    if(err) { return handleError(res, err); }
    if(!song) { return res.send(404); }
    song.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}