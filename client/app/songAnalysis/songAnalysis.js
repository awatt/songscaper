'use strict';

angular.module('songscaperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('songAnalysis', {
        url: '/songs',
        templateUrl: 'app/songAnalysis/songAnalysis.html',
        controller: 'SongAnalysisCtrl'
      });
  })
//   .directive('analysisGraph', function(){

//   return {
//     // restrict: 'E',
//     // scope: {
//     //   val: '=',
//     //   grouped: '='
//     // },
//     link: function(scope, element, attrs){
//   //UI configuration
//   var itemSize = 18,
//     cellSize = itemSize-1,
//     width = 800,
//     height = 800,
//     margin = {top:20,right:20,bottom:20,left:25};

//   //formats
//   var hourFormat = d3.time.format('%H'),
//     dayFormat = d3.time.format('%j'),
//     timeFormat = d3.time.format('%Y-%m-%dT%X'),
//     monthDayFormat = d3.time.format('%m.%d');

//   //data vars for rendering
//   var dateExtent = null,
//     data = null,
//     dayOffset = 0,
//     colorCalibration = ['#f6faaa','#FEE08B','#FDAE61','#F46D43','#D53E4F','#9E0142'],
//     dailyValueExtent = {};

//   //axises and scales
//   var axisWidth = 0 ,
//     axisHeight = itemSize*24,
//     xAxisScale = d3.time.scale(),
//     xAxis = d3.svg.axis()
//       .orient('top')
//       .ticks(d3.time.days,3)
//       .tickFormat(monthDayFormat),
//     yAxisScale = d3.scale.linear()
//       .range([0,axisHeight])
//       .domain([0,24]),
//     yAxis = d3.svg.axis()
//       .orient('left')
//       .ticks(5)
//       .tickFormat(d3.format('02d'))
//       .scale(yAxisScale);

//   initCalibration();

//   var svg = d3.select('[role="heatmap"]');
//   var heatmap = svg
//     .attr('width',width)
//     .attr('height',height)
//   .append('g')
//     .attr('width',width-margin.left-margin.right)
//     .attr('height',height-margin.top-margin.bottom)
//     .attr('transform','translate('+margin.left+','+margin.top+')');
//   var rect = null;

//   d3.json('pm25.json',function(err,data){
//     data = data.data;
//     data.forEach(function(valueObj){
//       valueObj['date'] = timeFormat.parse(valueObj['timestamp']);
//       var day = valueObj['day'] = monthDayFormat(valueObj['date']);

//       var dayData = dailyValueExtent[day] = (dailyValueExtent[day] || [1000,-1]);
//       var pmValue = valueObj['value']['PM2.5'];
//       dayData[0] = d3.min([dayData[0],pmValue]);
//       dayData[1] = d3.max([dayData[1],pmValue]);
//     });

//     dateExtent = d3.extent(data,function(d){
//       return d.date;
//     });

//     axisWidth = itemSize*(dayFormat(dateExtent[1])-dayFormat(dateExtent[0])+1);

//     //render axises
//     xAxis.scale(xAxisScale.range([0,axisWidth]).domain([dateExtent[0],dateExtent[1]]));  
//     svg.append('g')
//       .attr('transform','translate('+margin.left+','+margin.top+')')
//       .attr('class','x axis')
//       .call(xAxis)
//     .append('text')
//       .text('date')
//       .attr('transform','translate('+axisWidth+',-10)');

//     svg.append('g')
//       .attr('transform','translate('+margin.left+','+margin.top+')')
//       .attr('class','y axis')
//       .call(yAxis)
//     .append('text')
//       .text('time')
//       .attr('transform','translate(-10,'+axisHeight+') rotate(-90)');

//     //render heatmap rects
//     dayOffset = dayFormat(dateExtent[0]);
//     rect = heatmap.selectAll('rect')
//       .data(data)
//     .enter().append('rect')
//       .attr('width',cellSize)
//       .attr('height',cellSize)
//       .attr('x',function(d){
//         return itemSize*(dayFormat(d.date)-dayOffset);
//       })
//       .attr('y',function(d){            
//         return hourFormat(d.date)*itemSize;
//       })
//       .attr('fill','#ffffff');

//     rect.filter(function(d){ return d.value['PM2.5']>0;})
//       .append('title')
//       .text(function(d){
//         return monthDayFormat(d.date)+' '+d.value['PM2.5'];
//       });

//     renderColor();
//   });

//   function initCalibration(){
//     d3.select('[role="calibration"] [role="example"]').select('svg')
//       .selectAll('rect').data(colorCalibration).enter()
//     .append('rect')
//       .attr('width',cellSize)
//       .attr('height',cellSize)
//       .attr('x',function(d,i){
//         return i*itemSize;
//       })
//       .attr('fill',function(d){
//         return d;
//       });

//     //bind click event
//     d3.selectAll('[role="calibration"] [name="displayType"]').on('click',function(){
//       renderColor();
//     });
//   }

//   function renderColor(){
//     var renderByCount = document.getElementsByName('displayType')[0].checked;

//     rect
//       .filter(function(d){
//         return (d.value['PM2.5']>=0);
//       })
//       .transition()
//       .delay(function(d){      
//         return (dayFormat(d.date)-dayOffset)*15;
//       })
//       .duration(500)
//       .attrTween('fill',function(d,i,a){
//         //choose color dynamicly      
//         var colorIndex = d3.scale.quantize()
//           .range([0,1,2,3,4,5])
//           .domain((renderByCount?[0,500]:dailyValueExtent[d.day]));

//         return d3.interpolate(a,colorCalibration[colorIndex(d.value['PM2.5'])]);
//       });
//   }
  
//   //extend frame height in `http://bl.ocks.org/`
//   d3.select(self.frameElement).style("height", "600px");  
// }
// }
// })









//   	function () {

//   // constants
//   var margin = 20,
//     width = 960,
//     height = 500 - .5 - margin,
//     color = d3.interpolateRgb("#f77", "#77f");

//   return {
//     restrict: 'E',
//     scope: {
//       val: '=',
//       grouped: '='
//     },
//     link: function (scope, element, attrs) {

//       // set up initial svg object
//       var vis = d3.select(element[0])
//         .append("svg")
//           .attr("width", width)
//           .attr("height", height + margin + 100);

//       scope.$watch('val', function (newVal, oldVal) {

//         // clear the elements inside of the directive
//         vis.selectAll('*').remove();

//         // if 'val' is undefined, exit
//         if (!newVal) {
//           return;
//         }

//         // Based on: http://mbostock.github.com/d3/ex/stack.html
//         var n = newVal.length, // number of layers
//             m = newVal[0].length, // number of samples per layer
//             data = d3.layout.stack()(newVal);

//         var mx = m,
//             my = d3.max(data, function(d) {
//               return d3.max(d, function(d) {
//                 return d.y0 + d.y;
//               });
//             }),
//             mz = d3.max(data, function(d) {
//               return d3.max(d, function(d) {
//                 return d.y;
//               });
//             }),
//             x = function(d) { return d.x * width / mx; },
//             y0 = function(d) { return height - d.y0 * height / my; },
//             y1 = function(d) { return height - (d.y + d.y0) * height / my; },
//             y2 = function(d) { return d.y * height / mz; }; // or `my` not rescale

//         // Layers for each color
//         // =====================

//         var layers = vis.selectAll("g.layer")
//             .data(data)
//           .enter().append("g")
//             .style("fill", function(d, i) {
//               return color(i / (n - 1));
//             })
//             .attr("class", "layer");

//         // Bars
//         // ====

//         var bars = layers.selectAll("g.bar")
//             .data(function(d) { return d; })
//           .enter().append("g")
//             .attr("class", "bar")
//             .attr("transform", function(d) {
//               return "translate(" + x(d) + ",0)";
//             });

//         bars.append("rect")
//             .attr("width", x({x: .9}))
//             .attr("x", 0)
//             .attr("y", height)
//             .attr("height", 0)
//           .transition()
//             .delay(function(d, i) { return i * 10; })
//             .attr("y", y1)
//             .attr("height", function(d) {
//               return y0(d) - y1(d);
//             });

//         // X-axis labels
//         // =============

//         var labels = vis.selectAll("text.label")
//             .data(data[0])
//           .enter().append("text")
//             .attr("class", "label")
//             .attr("x", x)
//             .attr("y", height + 6)
//             .attr("dx", x({x: .45}))
//             .attr("dy", ".71em")
//             .attr("text-anchor", "middle")
//             .text(function(d, i) {
//               return d.date;
//             });

//         // Chart Key
//         // =========

//         var keyText = vis.selectAll("text.key")
//             .data(data)
//           .enter().append("text")
//             .attr("class", "key")
//             .attr("y", function (d, i) {
//               return height + 42 + 30*(i%3);
//             })
//             .attr("x", function (d, i) {
//               return 155 * Math.floor(i/3) + 15;
//             })
//             .attr("dx", x({x: .45}))
//             .attr("dy", ".71em")
//             .attr("text-anchor", "left")
//             .text(function(d, i) {
//               return d[0].user;
//             });

//         var keySwatches = vis.selectAll("rect.swatch")
//             .data(data)
//           .enter().append("rect")
//             .attr("class", "swatch")
//             .attr("width", 20)
//             .attr("height", 20)
//             .style("fill", function(d, i) {
//               return color(i / (n - 1));
//             })
//             .attr("y", function (d, i) {
//               return height + 36 + 30*(i%3);
//             })
//             .attr("x", function (d, i) {
//               return 155 * Math.floor(i/3);
//             });


//         // Animate between grouped and stacked
//         // ===================================

//         function transitionGroup() {
//           vis.selectAll("g.layer rect")
//             .transition()
//               .duration(500)
//               .delay(function(d, i) { return (i % m) * 10; })
//               .attr("x", function(d, i) { return x({x: .9 * ~~(i / m) / n}); })
//               .attr("width", x({x: .9 / n}))
//               .each("end", transitionEnd);

//           function transitionEnd() {
//             d3.select(this)
//               .transition()
//                 .duration(500)
//                 .attr("y", function(d) { return height - y2(d); })
//                 .attr("height", y2);
//           }
//         }

//         function transitionStack() {
//           vis.selectAll("g.layer rect")
//             .transition()
//               .duration(500)
//               .delay(function(d, i) { return (i % m) * 10; })
//               .attr("y", y1)
//               .attr("height", function(d) {
//                 return y0(d) - y1(d);
//               })
//               .each("end", transitionEnd);

//           function transitionEnd() {
//             d3.select(this)
//               .transition()
//                 .duration(500)
//                 .attr("x", 0)
//                 .attr("width", x({x: .9}));
//           }
//         }

//         // reset grouped state to false
//         scope.grouped = false;

//         // setup a watch on 'grouped' to switch between views
//         scope.$watch('grouped', function (newVal, oldVal) {
//           // ignore first call which happens before we even have data from the Github API
//           if (newVal === oldVal) {
//             return;
//           }
//           if (newVal) {
//             transitionGroup();
//           } else {
//             transitionStack();
//           }
//         });
//       });
//     }
//   }
// });