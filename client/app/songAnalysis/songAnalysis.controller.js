    'use strict';

angular.module('songscaperApp')

.controller('SongAnalysisCtrl', function ($scope, $http) {

    $scope.name = '';
    // console.log(seedData)
    // $scope.seedData = seedData;
    

    function resetResults(){
        $scope.artistResults = [];
        $scope.albumResults = [];
        $scope.trackResults = [];
        $scope.analysisResults = [];
    };

    

    $scope.searchArtistId = function(name){
        resetResults();
        $http.get('/api/songs/searchArtistId?name=' + name).success(function(data) {
            data.artists.items.forEach(function(artist){
                $scope.artistResults.push({
                    artist: artist.name,
                    image: artist.images[0] ? artist.images[0].url : "",
                    id: artist.id
                });
            })
        })
    };

    $scope.getAlbumsById = function(id){
        resetResults()
        $http.get('/api/songs/getAlbumsById?id=' + id).success(function(data) {
            data.items.forEach(function(album){
                $scope.albumResults.push({
                    album: album.name,
                    image: album.images[0] ? album.images[0].url : "",
                    id: album.id
                });
            })
            // console.log($scope.albumResults)
        })
    }

    $scope.getTracksById = function(id){
        resetResults()
        $http.get('/api/songs/getTracksById?id=' + id).success(function(data) {
            data.forEach(function(el){
                el = JSON.parse(el);
                $scope.trackResults.push({
                    title: el.response.songs[0].title,
                    analysis_url: el.response.songs[0].audio_summary.analysis_url + "&format=json",
                    id: el.response.songs[0].id,
                });
            })
            // console.log($scope.trackResults)
        })
    }

    $scope.analyzeTrack = function(track){
        resetResults()
        $http.post('/api/songs/analyzeTrack', {'analysis_url': track.analysis_url}).success(function(data) {
            var data = JSON.parse(data);
            data.segments.forEach(function(el){
              $scope.analysisResults.push({
                start: el.start,
                // duration: el.duration,
                pitches: el.pitches
            })
          })
            var analysisData = $scope.analysisResults 
            console.log(analysisData) 
        })
    }
});

