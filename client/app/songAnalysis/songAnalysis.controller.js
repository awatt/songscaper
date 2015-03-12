'use strict';

angular.module('songscaperApp')

.controller('SongAnalysisCtrl', function ($scope, $http, graphService) {

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



//     {"data":
//         [
//         {"timestamp":"2014-09-25T00:00:00",
//             "value":{"PM2.5":30.22}
//         },
//         {"timestamp":"2014-09-25T01:00:00",
//             "value":{"PM2.5":41.61}
//         }
//         ]
//     }


// })

// .directive('d3Bars', ['$window', '$timeout', 'd3Service',
//     function($window, $timeout, d3Service) {
//         return {
//             restrict: 'A',
//             scope: {
//                 data: '=',
//                 label: '@',
//                 onClick: '&'
//             },
//             link: function(scope, ele, attrs) {

//                 d3Service.d3().then(function(d3) {

//                     var renderTimeout;
//                     var margin = parseInt(attrs.margin) || 20,
//                     barHeight = parseInt(attrs.barHeight) || 20,
//                     barPadding = parseInt(attrs.barPadding) || 5;

//                     var svg = d3.select(ele[0])
//                     .append('svg')
//                     .style('width', '100%');

//                     $window.onresize = function() {
//                         scope.$apply();
//                     };

//                          // hard-code data
//                          scope.data = [
//                          {name: "Greg", score: 98},
//                          {name: "Ari", score: 96},
//                          {name: 'Q', score: 75},
//                          {name: "Loser", score: 48}
//                          ];

//                          scope.$watch(function() {
//                             return angular.element($window)[0].innerWidth;
//                         }, function() {
//                             scope.render(scope.data);
//                         });

//                         // watch for data changes and re-render
//                         scope.$watch('data', function(newVals, oldVals) {
//                             return scope.render(newVals);
//                         }, true);

//                         scope.render = function(data) {
//                             svg.selectAll('*').remove();

//                             if (!data) return;
//                             if (renderTimeout) clearTimeout(renderTimeout);

//                             renderTimeout = $timeout(function() {
//                                 var width = d3.select(ele[0])[0][0].offsetWidth - margin,
//                                 height = scope.data.length * (barHeight + barPadding),
//                                 color = d3.scale.category20(),
//                                 xScale = d3.scale.linear()
//                                 .domain([0, d3.max(data, function(d) {
//                                     return d.score;
//                                 })])
//                                 .range([0, width]);

//                                 svg.attr('height', height);

//                                 svg.selectAll('rect')
//                                 .data(data)
//                                 .enter()
//                                 .append('rect')
//                                 .on('click', function(d, i) {
//                                     return scope.onClick({
//                                         item: d
//                                     });
//                                 })
//                                 .attr('height', barHeight)
//                                 .attr('width', 140)
//                                 .attr('x', Math.round(margin / 2))
//                                 .attr('y', function(d, i) {
//                                     return i * (barHeight + barPadding);
//                                 })
//                                 .attr('fill', function(d) {
//                                     return d.color;
//                                 })
//                                 .on('click', function(d, i) {
//                                     return scope.onClick({
//                                         item: d
//                                     });
//                                 })
//                                 .transition()
//                                 .duration(1000)
//                                 .attr('width', function(d) {
//                                     return xScale(d.score);
//                                 });
//                                 svg.selectAll('text')
//                                 .data(data)
//                                 .enter()
//                                 .append('text')
//                                 .attr('fill', '#fff')
//                                 .attr('y', function(d, i) {
//                                     return i * (barHeight + barPadding) + 15;
//                                 })
//                                 .attr('x', 15)
//                                 .text(function(d) {
//                                     return d.name + ": " + d.mood + " (Factor: " + d.score + ")";
//                                 });
//                             }, 200);
// };
// });
// }
// }
// }
// ])




// "segments": [
//     {
//       "start": 0,
//       "duration": 0.21061,
//       "confidence": 0,
//       "loudness_start": -60,
//       "loudness_max_time": 0,
//       "loudness_max": -60,
//       "pitches": [
//         1,
//         0.577,
//         0.042,
//         0.039,
//         0.042,
//         0.05,
//         0.029,
//         0.024,
//         0.031,
//         0.013,
//         0.044,
//         0.211
//       ],
//       "timbre": [
//         0,
//         171.13,
//         9.469,
//         -28.48,
//         57.491,
//         -50.067,
//         14.833,
//         5.359,
//         -27.228,
//         0.973,
//         -10.64,
//         -7.228
//       ]
//     },

