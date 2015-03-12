'use strict';

var express = require('express');
var controller = require('./song.controller');

var router = express.Router();

router.get('/searchArtistId', controller.searchArtistId);
router.get('/getAlbumsById', controller.getAlbumsById);
router.get('/getTracksById', controller.getTracksById);
router.post('/analyzeTrack', controller.analyzeTrack);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;

