'use strict';

angular.module('songscaperApp')
  .directive('analysisChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      scope: {
      	analysisResults: '='
      },
      link: function (scope, element, attrs) {
       	d3Service.d3().then(function(d3){

// var m = {top: 40, right: 20, bottom: 20, left: 60},
			// frameWidth = Number((window.innerWidth*.6).toFixed(2)),
			// frameHeight = Number((window.innerHeight*.7).toFixed(2)),
			// barSize = frameWidth/numResponses;


						//songscaper seed data
			// var data = [{"start":0,"pitch":0,"value":0.712},{"start":0,"pitch":1,"value":0.288},{"start":0,"pitch":2,"value":0.156},{"start":0,"pitch":3,"value":0.156},{"start":0,"pitch":4,"value":0.192},{"start":0,"pitch":5,"value":0.225},{"start":0,"pitch":6,"value":0.485},{"start":0,"pitch":7,"value":0.429},{"start":0,"pitch":8,"value":0.653},{"start":0,"pitch":9,"value":0.572},{"start":0,"pitch":10,"value":1},{"start":0,"pitch":11,"value":0.251},{"start":0.17311,"pitch":0,"value":0.722},{"start":0.17311,"pitch":1,"value":0.398},{"start":0.17311,"pitch":2,"value":0.356},{"start":0.17311,"pitch":3,"value":0.512},{"start":0.17311,"pitch":4,"value":0.84},{"start":0.17311,"pitch":5,"value":0.899},{"start":0.17311,"pitch":6,"value":0.447},{"start":0.17311,"pitch":7,"value":0.677},{"start":0.17311,"pitch":8,"value":0.892},{"start":0.17311,"pitch":9,"value":0.989},{"start":0.17311,"pitch":10,"value":0.838},{"start":0.17311,"pitch":11,"value":1}]

			var data = scope.analysisResults;

			console.log(data)


			  //UI configuration
			  var segments = data.length/12, 
			  	width = 400,
			  	keyHeight = 3/7*width,
			    height = keyHeight*segments,
			    margin = {top:20,right:20,bottom:20,left:25};
			   
			  //formats
			  var timeFormat = d3.time.format('%Y-%m-%dT%X');

			  //data vars for rendering
			  var 
			    keyOffsets = [0,.75,1,1.75,2,3,3.75,4,4.75,5,5.75,6],
			    keyPoints = [[{"x":0.0, "y":0.0},{"x":0.0,"y":3.0},{"x":1.0,"y":3.0},{"x":1.0,"y":2.0},{"x":0.75,"y":2.0},{"x":0.75,"y":0.0},{"x":0.0,"y":0.0}],
			    [{"x":0.0, "y":0.0},{"x":0.0,"y":2.0},{"x":0.5,"y":2.0},{"x":0.5,"y":0.0},{"x":0.0,"y":0.0}],
			    [{"x":0.25, "y":0.0},{"x":0.25,"y":2.0},{"x":0.0,"y":2.0},{"x":0.0,"y":3.0},{"x":1.0,"y":3.0},{"x":1.0,"y":2.0},{"x":0.75,"y":2.0},{"x":0.75,"y":0.0},{"x":0.25,"y":0.0}],
			    [{"x":0.0, "y":0.0},{"x":0.0,"y":2.0},{"x":0.5,"y":2.0},{"x":0.5,"y":0.0},{"x":0.0,"y":0.0}],
			    [{"x":0.25, "y":0.0},{"x":0.25,"y":2.0},{"x":0.0,"y":2.0},{"x":0.0,"y":3.0},{"x":1.0,"y":3.0},{"x":1.00,"y":0.0},{"x":0.25,"y":0.0}],
			    [{"x":0.0, "y":0.0},{"x":0.0,"y":3.0},{"x":1.0,"y":3.0},{"x":1.0,"y":2.0},{"x":0.75,"y":2.0},{"x":0.75,"y":0.0},{"x":0.0,"y":0.0}],
			    [{"x":0.0, "y":0.0},{"x":0.0,"y":2.0},{"x":0.5,"y":2.0},{"x":0.5,"y":0.0},{"x":0.0,"y":0.0}],
			    [{"x":0.25, "y":0.0},{"x":0.25,"y":2.0},{"x":0.0,"y":2.0},{"x":0.0,"y":3.0},{"x":1.0,"y":3.0},{"x":1.0,"y":2.0},{"x":0.75,"y":2.0},{"x":0.75,"y":0.0},{"x":0.25,"y":0.0}],
			    [{"x":0.0, "y":0.0},{"x":0.0,"y":2.0},{"x":0.5,"y":2.0},{"x":0.5,"y":0.0},{"x":0.0,"y":0.0}],
			    [{"x":0.25, "y":0.0},{"x":0.25,"y":2.0},{"x":0.0,"y":2.0},{"x":0.0,"y":3.0},{"x":1.0,"y":3.0},{"x":1.0,"y":2.0},{"x":0.75,"y":2.0},{"x":0.75,"y":0.0},{"x":0.25,"y":0.0}],
			    [{"x":0.0, "y":0.0},{"x":0.0,"y":2.0},{"x":0.5,"y":2.0},{"x":0.5,"y":0.0},{"x":0.0,"y":0.0}],
			    [{"x":0.25, "y":0.0},{"x":0.25,"y":2.0},{"x":0.0,"y":2.0},{"x":0.0,"y":3.0},{"x":1.0,"y":3.0},{"x":1.00,"y":0.0},{"x":0.25,"y":0.0}]],
			    keyColor = ['#fff','#000','#fff','#000','#fff','#fff','#000','#fff','#000','#fff','#000','#fff'],
			    segmentNum = function(i){ return Math.floor(i/12); };


			  //scales
			   	var scaleX = d3.scale.linear()
				        .domain([0,7])
				        .range([0,width]),

				scaleY = d3.scale.linear()
				        .domain([0,7])
				        .range([0,width])


			  //make svg frame
			  var svg = d3.select('[role="heatmap2"]');
			  var heatmap2 = svg
			    .attr('width',width+margin.left+margin.right)
			    .attr('height',height+margin.top+margin.bottom)
			  .append('g')
			    .attr('width',width)
			    .attr('height',height)
			    .attr('transform','translate('+margin.left+','+margin.top+')');
			  

			    //append polygons to frame
			   heatmap2.selectAll('polygon')
			      .data(data)
			    .enter().append('polygon')
			      .attr('points', function(d){
			      	var pointString = '';
			      	keyPoints[d.pitch].forEach(function(p){
			      		pointString += scaleX(p.x) + ',' + scaleY(p.y) + ', '
			      	})
			      	return pointString.slice(0,pointString.length-2);
			      })
			      .attr('transform', function(d, i){
			      	return 'translate('+scaleX(keyOffsets[d.pitch])+', '+keyHeight*segmentNum(i)+')';
			      })
			      .attr('fill', function(d){
			      	return keyColor[d.pitch];
			      })
			      .attr('class', function(d){
			      	if(d.value > 0){
			      		return 'silent'
			      	}
			      })

			
			  //close d3 service CB function
			});


        //close link function
      }
 


      //close return object
    };
  

    //close main directive CB function
  }]);