'use strict';

angular.module('songscaperApp')
  .directive('modelChart', ['d3Service', function(d3Service) {
    return {
      restrict: 'EA',
      // scope: {},
      link: function (scope, element, attrs) {
       	d3Service.d3().then(function(d3){





			  //UI configuration
			  var itemSize = 18,
			    cellSize = itemSize-1,
			    width = 800,
			    height = 800,
			    margin = {top:20,right:20,bottom:20,left:25};

			  //formats
			  var hourFormat = d3.time.format('%H'),
			    dayFormat = d3.time.format('%j'),
			    timeFormat = d3.time.format('%Y-%m-%dT%X'),
			    monthDayFormat = d3.time.format('%m.%d');

			  //data vars for rendering
			  var dateExtent = null,
			    data = null,
			    dayOffset = 0,
			    colorCalibration = ['#f6faaa','#FEE08B','#FDAE61','#F46D43','#D53E4F','#9E0142'],
			    dailyValueExtent = {};

			  // //axises and scales
			  // var axisWidth = 0 ,
			  //   axisHeight = itemSize*24,
			  //   xAxisScale = d3.time.scale(),
			  //   xAxis = d3.svg.axis()
			  //     .orient('top')
			  //     .ticks(d3.time.days,3)
			  //     .tickFormat(monthDayFormat),
			  //   yAxisScale = d3.scale.linear()
			  //     .range([0,axisHeight])
			  //     .domain([0,24]),
			  //   yAxis = d3.svg.axis()
			  //     .orient('left')
			  //     .ticks(5)
			  //     .tickFormat(d3.format('02d'))
			  //     .scale(yAxisScale);

			  initCalibration();

			  var svg = d3.select('[role="heatmap"]');
			  var heatmap = svg
			    .attr('width',width)
			    .attr('height',height)
			  .append('g')
			    .attr('width',width-margin.left-margin.right)
			    .attr('height',height-margin.top-margin.bottom)
			    .attr('transform','translate('+margin.left+','+margin.top+')');
			  var rect = null;

			
			  var pm25 = {
 						 "data":[{"timestamp": "2014-09-25T00:00:00", "value": {"PM2.5": 30.22}}, {"timestamp": "2014-09-25T01:00:00", "value": {"PM2.5": 41.61}}, {"timestamp": "2014-09-25T02:00:00", "value": {"PM2.5": 50.71}}, {"timestamp": "2014-09-25T03:00:00", "value": {"PM2.5": 57.34}}, {"timestamp": "2014-09-25T04:00:00", "value": {"PM2.5": 79.64}}, {"timestamp": "2014-09-25T05:00:00", "value": {"PM2.5": 76.93}}, {"timestamp": "2014-09-25T06:00:00", "value": {"PM2.5": 106.45}}, {"timestamp": "2014-09-25T07:00:00", "value": {"PM2.5": 79.72}}, {"timestamp": "2014-09-25T08:00:00", "value": {"PM2.5": 74.23}}, {"timestamp": "2014-09-25T09:00:00", "value": {"PM2.5": 90.48}}, {"timestamp": "2014-09-25T10:00:00", "value": {"PM2.5": 94.74}}, {"timestamp": "2014-09-25T11:00:00", "value": {"PM2.5": 85.97}}, {"timestamp": "2014-09-25T12:00:00", "value": {"PM2.5": 69.23}}, {"timestamp": "2014-09-25T13:00:00", "value": {"PM2.5": 82.63}}, {"timestamp": "2014-09-25T14:00:00", "value": {"PM2.5": 244.89}}, {"timestamp": "2014-09-25T15:00:00", "value": {"PM2.5": 363.18}}, {"timestamp": "2014-09-25T16:00:00", "value": {"PM2.5": 397.89}}, {"timestamp": "2014-09-25T17:00:00", "value": {"PM2.5": 344.67}}, {"timestamp": "2014-09-25T18:00:00", "value": {"PM2.5": 328.47}}, {"timestamp": "2014-09-25T19:00:00", "value": {"PM2.5": 305.47}}, {"timestamp": "2014-09-25T20:00:00", "value": {"PM2.5": 344.87}}, {"timestamp": "2014-09-25T21:00:00", "value": {"PM2.5": 336.82}}, {"timestamp": "2014-09-25T22:00:00", "value": {"PM2.5": 291.29}}, {"timestamp": "2014-09-25T23:00:00", "value": {"PM2.5": 260.16}}, {"timestamp": "2014-09-26T00:00:00", "value": {"PM2.5": 251.12}}, {"timestamp": "2014-09-26T01:00:00", "value": {"PM2.5": 213.73}}, {"timestamp": "2014-09-26T02:00:00", "value": {"PM2.5": 188.96}}, {"timestamp": "2014-09-26T03:00:00", "value": {"PM2.5": 170.37}}, {"timestamp": "2014-09-26T04:00:00", "value": {"PM2.5": 152.53}}, {"timestamp": "2014-09-26T05:00:00", "value": {"PM2.5": 145.44}}, {"timestamp": "2014-09-26T06:00:00", "value": {"PM2.5": 144.09}}, {"timestamp": "2014-09-26T07:00:00", "value": {"PM2.5": 169.71}}, {"timestamp": "2014-09-26T08:00:00", "value": {"PM2.5": 207.33}}, {"timestamp": "2014-09-26T09:00:00", "value": {"PM2.5": 208.24}}, {"timestamp": "2014-09-26T10:00:00", "value": {"PM2.5": 215.42}}, {"timestamp": "2014-09-26T11:00:00", "value": {"PM2.5": 208.86}}, {"timestamp": "2014-09-26T12:00:00", "value": {"PM2.5": 239.67}}, {"timestamp": "2014-09-26T13:00:00", "value": {"PM2.5": 242.51}}, {"timestamp": "2014-09-26T14:00:00", "value": {"PM2.5": 252.05}}, {"timestamp": "2014-09-26T15:00:00", "value": {"PM2.5": 239.24}}, {"timestamp": "2014-09-26T16:00:00", "value": {"PM2.5": 254.14}}, {"timestamp": "2014-09-26T17:00:00", "value": {"PM2.5": 287.29}}, {"timestamp": "2014-09-26T18:00:00", "value": {"PM2.5": 280.43}}, {"timestamp": "2014-09-26T19:00:00", "value": {"PM2.5": 294.95}}, {"timestamp": "2014-09-26T20:00:00", "value": {"PM2.5": 269.68}}, {"timestamp": "2014-09-26T21:00:00", "value": {"PM2.5": 105.62}}, {"timestamp": "2014-09-26T22:00:00", "value": {"PM2.5": 94.32}}, {"timestamp": "2014-09-26T23:00:00", "value": {"PM2.5": 66.55}}, {"timestamp": "2014-09-27T00:00:00", "value": {"PM2.5": 76.33}}, {"timestamp": "2014-09-27T01:00:00", "value": {"PM2.5": 27.83}}, {"timestamp": "2014-09-27T02:00:00", "value": {"PM2.5": 62.01}}, {"timestamp": "2014-09-27T03:00:00", "value": {"PM2.5": 43.96}}, {"timestamp": "2014-09-27T04:00:00", "value": {"PM2.5": 26.89}}, {"timestamp": "2014-09-27T05:00:00", "value": {"PM2.5": 26.23}}, {"timestamp": "2014-09-27T06:00:00", "value": {"PM2.5": 21.32}}, {"timestamp": "2014-09-27T07:00:00", "value": {"PM2.5": 20.81}}, {"timestamp": "2014-09-27T08:00:00", "value": {"PM2.5": 24.04}}, {"timestamp": "2014-09-27T09:00:00", "value": {"PM2.5": 21.65}}, {"timestamp": "2014-09-27T10:00:00", "value": {"PM2.5": 10.51}}, {"timestamp": "2014-09-27T11:00:00", "value": {"PM2.5": 8.92}}, {"timestamp": "2014-09-27T12:00:00", "value": {"PM2.5": 6.97}}, {"timestamp": "2014-09-27T13:00:00", "value": {"PM2.5": 4.3}}, {"timestamp": "2014-09-27T14:00:00", "value": {"PM2.5": 5.38}}, {"timestamp": "2014-09-27T15:00:00", "value": {"PM2.5": 12.7}}, {"timestamp": "2014-09-27T16:00:00", "value": {"PM2.5": 11.07}}, {"timestamp": "2014-09-27T17:00:00", "value": {"PM2.5": 26.12}}, {"timestamp": "2014-09-27T18:00:00", "value": {"PM2.5": 155.54}}, {"timestamp": "2014-09-27T19:00:00", "value": {"PM2.5": 16.69}}, {"timestamp": "2014-09-27T20:00:00", "value": {"PM2.5": 10.73}}, {"timestamp": "2014-09-27T21:00:00", "value": {"PM2.5": 10.09}}, {"timestamp": "2014-09-27T22:00:00", "value": {"PM2.5": 17.9}}, {"timestamp": "2014-09-27T23:00:00", "value": {"PM2.5": 21.24}}, {"timestamp": "2014-09-28T00:00:00", "value": {"PM2.5": 22.61}}, {"timestamp": "2014-09-28T01:00:00", "value": {"PM2.5": 27.05}}, {"timestamp": "2014-09-28T02:00:00", "value": {"PM2.5": 24.34}}, {"timestamp": "2014-09-28T03:00:00", "value": {"PM2.5": 19.63}}, {"timestamp": "2014-09-28T04:00:00", "value": {"PM2.5": 26.33}}, {"timestamp": "2014-09-28T05:00:00", "value": {"PM2.5": 23.62}}, {"timestamp": "2014-09-28T06:00:00", "value": {"PM2.5": 21.46}}, {"timestamp": "2014-09-28T07:00:00", "value": {"PM2.5": 24.73}}, {"timestamp": "2014-09-28T08:00:00", "value": {"PM2.5": 44.34}}, {"timestamp": "2014-09-28T09:00:00", "value": {"PM2.5": 35.01}}, {"timestamp": "2014-09-28T10:00:00", "value": {"PM2.5": 33.54}}, {"timestamp": "2014-09-28T11:00:00", "value": {"PM2.5": 38.61}}, {"timestamp": "2014-09-28T12:00:00", "value": {"PM2.5": 80.41}}, {"timestamp": "2014-09-28T13:00:00", "value": {"PM2.5": 77.11}}, {"timestamp": "2014-09-28T14:00:00", "value": {"PM2.5": 74.43}}, {"timestamp": "2014-09-28T15:00:00", "value": {"PM2.5": 97.76}}, {"timestamp": "2014-09-28T16:00:00", "value": {"PM2.5": 121.23}}, {"timestamp": "2014-09-28T17:00:00", "value": {"PM2.5": 151.39}}, {"timestamp": "2014-09-28T18:00:00", "value": {"PM2.5": 145.58}}, {"timestamp": "2014-09-28T19:00:00", "value": {"PM2.5": 133.08}}, {"timestamp": "2014-09-28T20:00:00", "value": {"PM2.5": 111.6}}, {"timestamp": "2014-09-28T21:00:00", "value": {"PM2.5": 118.36}}, {"timestamp": "2014-09-28T22:00:00", "value": {"PM2.5": 117.77}}, {"timestamp": "2014-09-28T23:00:00", "value": {"PM2.5": 125.95}}, {"timestamp": "2014-09-29T00:00:00", "value": {"PM2.5": 126.74}}, {"timestamp": "2014-09-29T01:00:00", "value": {"PM2.5": 121.47}}, {"timestamp": "2014-09-29T02:00:00", "value": {"PM2.5": 113.75}}, {"timestamp": "2014-09-29T03:00:00", "value": {"PM2.5": 117.12}}, {"timestamp": "2014-09-29T04:00:00", "value": {"PM2.5": 130.76}}, {"timestamp": "2014-09-29T05:00:00", "value": {"PM2.5": 126.4}}, {"timestamp": "2014-09-29T06:00:00", "value": {"PM2.5": 136.94}}, {"timestamp": "2014-09-29T07:00:00", "value": {"PM2.5": 129.97}}, {"timestamp": "2014-09-29T08:00:00", "value": {"PM2.5": 155.04}}, {"timestamp": "2014-09-29T09:00:00", "value": {"PM2.5": 112.96}}, {"timestamp": "2014-09-29T10:00:00", "value": {"PM2.5": 23.58}}, {"timestamp": "2014-09-29T11:00:00", "value": {"PM2.5": 15.25}}, {"timestamp": "2014-09-29T12:00:00", "value": {"PM2.5": 14.04}}, {"timestamp": "2014-09-29T13:00:00", "value": {"PM2.5": 10.1}}, {"timestamp": "2014-09-29T14:00:00", "value": {"PM2.5": 6.55}}, {"timestamp": "2014-09-29T15:00:00", "value": {"PM2.5": 5.64}}, {"timestamp": "2014-09-29T16:00:00", "value": {"PM2.5": 6.75}}, {"timestamp": "2014-09-29T17:00:00", "value": {"PM2.5": 7.12}}, {"timestamp": "2014-09-29T18:00:00", "value": {"PM2.5": 8.91}}, {"timestamp": "2014-09-29T19:00:00", "value": {"PM2.5": 9.57}}, {"timestamp": "2014-09-29T20:00:00", "value": {"PM2.5": 12.11}}, {"timestamp": "2014-09-29T21:00:00", "value": {"PM2.5": 10.14}}, {"timestamp": "2014-09-29T22:00:00", "value": {"PM2.5": 7.79}}, {"timestamp": "2014-09-29T23:00:00", "value": {"PM2.5": 6.14}}, {"timestamp": "2014-09-30T00:00:00", "value": {"PM2.5": 18.59}}, {"timestamp": "2014-09-30T01:00:00", "value": {"PM2.5": 22.16}}, {"timestamp": "2014-09-30T02:00:00", "value": {"PM2.5": 16.92}}, {"timestamp": "2014-09-30T03:00:00", "value": {"PM2.5": 25.11}}, {"timestamp": "2014-09-30T04:00:00", "value": {"PM2.5": 40.97}}, {"timestamp": "2014-09-30T05:00:00", "value": {"PM2.5": 45.79}}, {"timestamp": "2014-09-30T06:00:00", "value": {"PM2.5": 36.7}}, {"timestamp": "2014-09-30T07:00:00", "value": {"PM2.5": 14.18}}, {"timestamp": "2014-09-30T08:00:00", "value": {"PM2.5": 24.86}}, {"timestamp": "2014-09-30T09:00:00", "value": {"PM2.5": 20.39}}, {"timestamp": "2014-09-30T10:00:00", "value": {"PM2.5": 19.79}}, {"timestamp": "2014-09-30T11:00:00", "value": {"PM2.5": 19.46}}, {"timestamp": "2014-09-30T12:00:00", "value": {"PM2.5": 31.15}}, {"timestamp": "2014-09-30T13:00:00", "value": {"PM2.5": 24.06}}, {"timestamp": "2014-09-30T14:00:00", "value": {"PM2.5": 30.12}}, {"timestamp": "2014-09-30T15:00:00", "value": {"PM2.5": 31.57}}, {"timestamp": "2014-09-30T16:00:00", "value": {"PM2.5": 34.88}}, {"timestamp": "2014-09-30T17:00:00", "value": {"PM2.5": 41.16}}, {"timestamp": "2014-09-30T18:00:00", "value": {"PM2.5": 47.41}}, {"timestamp": "2014-09-30T19:00:00", "value": {"PM2.5": 58.39}}, {"timestamp": "2014-09-30T20:00:00", "value": {"PM2.5": 42.18}}, {"timestamp": "2014-09-30T21:00:00", "value": {"PM2.5": 40.16}}, {"timestamp": "2014-09-30T22:00:00", "value": {"PM2.5": 39.45}}, {"timestamp": "2014-09-30T23:00:00", "value": {"PM2.5": 37.49}}, {"timestamp": "2014-10-01T00:00:00", "value": {"PM2.5": 42.77}}, {"timestamp": "2014-10-01T01:00:00", "value": {"PM2.5": 43.73}}, {"timestamp": "2014-10-01T02:00:00", "value": {"PM2.5": 41.56}}, {"timestamp": "2014-10-01T03:00:00", "value": {"PM2.5": 40.69}}, {"timestamp": "2014-10-01T04:00:00", "value": {"PM2.5": 42.65}}, {"timestamp": "2014-10-01T05:00:00", "value": {"PM2.5": 43.86}}, {"timestamp": "2014-10-01T06:00:00", "value": {"PM2.5": 40.06}}, {"timestamp": "2014-10-01T07:00:00", "value": {"PM2.5": 58.56}}, {"timestamp": "2014-10-01T08:00:00", "value": {"PM2.5": 57.51}}, {"timestamp": "2014-10-01T09:00:00", "value": {"PM2.5": 69.77}}, {"timestamp": "2014-10-01T10:00:00", "value": {"PM2.5": 76.35}}, {"timestamp": "2014-10-01T11:00:00", "value": {"PM2.5": 72.26}}, {"timestamp": "2014-10-01T12:00:00", "value": {"PM2.5": 95.8}}, {"timestamp": "2014-10-01T13:00:00", "value": {"PM2.5": 104.79}}, {"timestamp": "2014-10-01T14:00:00", "value": {"PM2.5": 93.45}}, {"timestamp": "2014-10-01T15:00:00", "value": {"PM2.5": 81.69}}, {"timestamp": "2014-10-01T16:00:00", "value": {"PM2.5": 88.27}}, {"timestamp": "2014-10-01T17:00:00", "value": {"PM2.5": 86.08}}, {"timestamp": "2014-10-01T18:00:00", "value": {"PM2.5": 78.72}}, {"timestamp": "2014-10-01T19:00:00", "value": {"PM2.5": 82.31}}, {"timestamp": "2014-10-01T20:00:00", "value": {"PM2.5": 73.06}}, {"timestamp": "2014-10-01T21:00:00", "value": {"PM2.5": 62.12}}, {"timestamp": "2014-10-01T22:00:00", "value": {"PM2.5": 54.43}}, {"timestamp": "2014-10-01T23:00:00", "value": {"PM2.5": 41.78}}, {"timestamp": "2014-10-02T00:00:00", "value": {"PM2.5": 34.93}}, {"timestamp": "2014-10-02T01:00:00", "value": {"PM2.5": 33.22}}, {"timestamp": "2014-10-02T02:00:00", "value": {"PM2.5": 33.72}}, {"timestamp": "2014-10-02T03:00:00", "value": {"PM2.5": 33.46}}, {"timestamp": "2014-10-02T04:00:00", "value": {"PM2.5": 25.31}}, {"timestamp": "2014-10-02T05:00:00", "value": {"PM2.5": 22.46}}, {"timestamp": "2014-10-02T06:00:00", "value": {"PM2.5": 22.94}}, {"timestamp": "2014-10-02T07:00:00", "value": {"PM2.5": 20.19}}, {"timestamp": "2014-10-02T08:00:00", "value": {"PM2.5": 26.69}}, {"timestamp": "2014-10-02T09:00:00", "value": {"PM2.5": 17.44}}, {"timestamp": "2014-10-02T10:00:00", "value": {"PM2.5": 14.73}}, {"timestamp": "2014-10-02T11:00:00", "value": {"PM2.5": 17.8}}, {"timestamp": "2014-10-02T12:00:00", "value": {"PM2.5": 19.19}}, {"timestamp": "2014-10-02T13:00:00", "value": {"PM2.5": 16.25}}, {"timestamp": "2014-10-02T14:00:00", "value": {"PM2.5": 18.47}}, {"timestamp": "2014-10-02T15:00:00", "value": {"PM2.5": 16.45}}, {"timestamp": "2014-10-02T16:00:00", "value": {"PM2.5": 30.11}}, {"timestamp": "2014-10-02T17:00:00", "value": {"PM2.5": 48.26}}, {"timestamp": "2014-10-02T18:00:00", "value": {"PM2.5": 38.79}}, {"timestamp": "2014-10-02T19:00:00", "value": {"PM2.5": 27.05}}, {"timestamp": "2014-10-02T20:00:00", "value": {"PM2.5": 14.22}}, {"timestamp": "2014-10-02T21:00:00", "value": {"PM2.5": 11.8}}, {"timestamp": "2014-10-02T22:00:00", "value": {"PM2.5": 10.11}}, {"timestamp": "2014-10-02T23:00:00", "value": {"PM2.5": 7.61}}, {"timestamp": "2014-10-03T00:00:00", "value": {"PM2.5": 8.89}}, {"timestamp": "2014-10-03T01:00:00", "value": {"PM2.5": 12.88}}, {"timestamp": "2014-10-03T02:00:00", "value": {"PM2.5": 19.39}}, {"timestamp": "2014-10-03T03:00:00", "value": {"PM2.5": 20.57}}, {"timestamp": "2014-10-03T04:00:00", "value": {"PM2.5": 18.02}}, {"timestamp": "2014-10-03T05:00:00", "value": {"PM2.5": 14.1}}, {"timestamp": "2014-10-03T06:00:00", "value": {"PM2.5": 10.78}}, {"timestamp": "2014-10-03T07:00:00", "value": {"PM2.5": 14.65}}, {"timestamp": "2014-10-03T08:00:00", "value": {"PM2.5": 17.8}}, {"timestamp": "2014-10-03T09:00:00", "value": {"PM2.5": 20.03}}, {"timestamp": "2014-10-03T10:00:00", "value": {"PM2.5": 18.75}}, {"timestamp": "2014-10-03T11:00:00", "value": {"PM2.5": 32.49}}, {"timestamp": "2014-10-03T12:00:00", "value": {"PM2.5": 21.53}}, {"timestamp": "2014-10-03T13:00:00", "value": {"PM2.5": 29.86}}, {"timestamp": "2014-10-03T14:00:00", "value": {"PM2.5": 54.58}}, {"timestamp": "2014-10-03T15:00:00", "value": {"PM2.5": 158.79}}, {"timestamp": "2014-10-03T16:00:00", "value": {"PM2.5": 201.58}}, {"timestamp": "2014-10-03T17:00:00", "value": {"PM2.5": 225.76}}, {"timestamp": "2014-10-03T18:00:00", "value": {"PM2.5": 276.68}}, {"timestamp": "2014-10-03T19:00:00", "value": {"PM2.5": 290.5}}, {"timestamp": "2014-10-03T20:00:00", "value": {"PM2.5": 296.66}}, {"timestamp": "2014-10-03T21:00:00", "value": {"PM2.5": 313.71}}, {"timestamp": "2014-10-03T22:00:00", "value": {"PM2.5": 329.96}}, {"timestamp": "2014-10-03T23:00:00", "value": {"PM2.5": 323.84}}, {"timestamp": "2014-10-04T00:00:00", "value": {"PM2.5": 311.63}}, {"timestamp": "2014-10-04T01:00:00", "value": {"PM2.5": 253.53}}, {"timestamp": "2014-10-04T02:00:00", "value": {"PM2.5": 195.69}}, {"timestamp": "2014-10-04T03:00:00", "value": {"PM2.5": 140.67}}, {"timestamp": "2014-10-04T04:00:00", "value": {"PM2.5": 111.06}}, {"timestamp": "2014-10-04T05:00:00", "value": {"PM2.5": 57.18}}, {"timestamp": "2014-10-04T06:00:00", "value": {"PM2.5": 50.87}}, {"timestamp": "2014-10-04T07:00:00", "value": {"PM2.5": 36.43}}, {"timestamp": "2014-10-04T08:00:00", "value": {"PM2.5": 26.89}}, {"timestamp": "2014-10-04T09:00:00", "value": {"PM2.5": 32.66}}, {"timestamp": "2014-10-04T10:00:00", "value": {"PM2.5": 28.13}}, {"timestamp": "2014-10-04T11:00:00", "value": {"PM2.5": 27.61}}, {"timestamp": "2014-10-04T12:00:00", "value": {"PM2.5": 23.81}}, {"timestamp": "2014-10-04T13:00:00", "value": {"PM2.5": 22.02}}, {"timestamp": "2014-10-04T14:00:00", "value": {"PM2.5": 57.46}}, {"timestamp": "2014-10-04T15:00:00", "value": {"PM2.5": 113.64}}, {"timestamp": "2014-10-04T16:00:00", "value": {"PM2.5": 160.12}}, {"timestamp": "2014-10-04T17:00:00", "value": {"PM2.5": 165.16}}, {"timestamp": "2014-10-04T18:00:00", "value": {"PM2.5": 173.02}}, {"timestamp": "2014-10-04T19:00:00", "value": {"PM2.5": 189.23}}, {"timestamp": "2014-10-04T20:00:00", "value": {"PM2.5": 196.8}}, {"timestamp": "2014-10-04T21:00:00", "value": {"PM2.5": 95.37}}, {"timestamp": "2014-10-04T22:00:00", "value": {"PM2.5": 61.04}}, {"timestamp": "2014-10-04T23:00:00", "value": {"PM2.5": 96.14}}, {"timestamp": "2014-10-05T00:00:00", "value": {"PM2.5": 159.21}}, {"timestamp": "2014-10-05T01:00:00", "value": {"PM2.5": 207.61}}, {"timestamp": "2014-10-05T02:00:00", "value": {"PM2.5": 248.96}}, {"timestamp": "2014-10-05T03:00:00", "value": {"PM2.5": 242.87}}, {"timestamp": "2014-10-05T04:00:00", "value": {"PM2.5": 249.19}}, {"timestamp": "2014-10-05T05:00:00", "value": {"PM2.5": 257.44}}, {"timestamp": "2014-10-05T06:00:00", "value": {"PM2.5": 100.41}}, {"timestamp": "2014-10-05T07:00:00", "value": {"PM2.5": 7.17}}, {"timestamp": "2014-10-05T08:00:00", "value": {"PM2.5": 16.69}}, {"timestamp": "2014-10-05T09:00:00", "value": {"PM2.5": 17.64}}, {"timestamp": "2014-10-05T10:00:00", "value": {"PM2.5": 4.41}}, {"timestamp": "2014-10-05T11:00:00", "value": {"PM2.5": 4.49}}, {"timestamp": "2014-10-05T12:00:00", "value": {"PM2.5": 3.34}}, {"timestamp": "2014-10-05T13:00:00", "value": {"PM2.5": 4.92}}, {"timestamp": "2014-10-05T14:00:00", "value": {"PM2.5": 3.15}}, {"timestamp": "2014-10-05T15:00:00", "value": {"PM2.5": 3.9}}, {"timestamp": "2014-10-05T16:00:00", "value": {"PM2.5": 4.24}}, {"timestamp": "2014-10-05T17:00:00", "value": {"PM2.5": 5.59}}, {"timestamp": "2014-10-05T18:00:00", "value": {"PM2.5": 10.31}}, {"timestamp": "2014-10-05T19:00:00", "value": {"PM2.5": 12.9}}, {"timestamp": "2014-10-05T20:00:00", "value": {"PM2.5": 8.41}}, {"timestamp": "2014-10-05T21:00:00", "value": {"PM2.5": 6.59}}, {"timestamp": "2014-10-05T22:00:00", "value": {"PM2.5": 5.58}}, {"timestamp": "2014-10-05T23:00:00", "value": {"PM2.5": 5.86}}, {"timestamp": "2014-10-06T00:00:00", "value": {"PM2.5": 5.76}}, {"timestamp": "2014-10-06T01:00:00", "value": {"PM2.5": 4.57}}, {"timestamp": "2014-10-06T02:00:00", "value": {"PM2.5": 15.34}}, {"timestamp": "2014-10-06T03:00:00", "value": {"PM2.5": 47.56}}, {"timestamp": "2014-10-06T04:00:00", "value": {"PM2.5": 14.69}}, {"timestamp": "2014-10-06T05:00:00", "value": {"PM2.5": 19.45}}, {"timestamp": "2014-10-06T06:00:00", "value": {"PM2.5": 26.48}}, {"timestamp": "2014-10-06T07:00:00", "value": {"PM2.5": 31.39}}, {"timestamp": "2014-10-06T08:00:00", "value": {"PM2.5": 31.24}}, {"timestamp": "2014-10-06T09:00:00", "value": {"PM2.5": 14.77}}, {"timestamp": "2014-10-06T10:00:00", "value": {"PM2.5": 15.32}}, {"timestamp": "2014-10-06T11:00:00", "value": {"PM2.5": 11.1}}, {"timestamp": "2014-10-06T12:00:00", "value": {"PM2.5": 9.58}}, {"timestamp": "2014-10-06T13:00:00", "value": {"PM2.5": 10.22}}, {"timestamp": "2014-10-06T14:00:00", "value": {"PM2.5": 12.62}}, {"timestamp": "2014-10-06T15:00:00", "value": {"PM2.5": 14.64}}, {"timestamp": "2014-10-06T16:00:00", "value": {"PM2.5": 16.44}}, {"timestamp": "2014-10-06T17:00:00", "value": {"PM2.5": 30.07}}, {"timestamp": "2014-10-06T18:00:00", "value": {"PM2.5": 37.81}}, {"timestamp": "2014-10-06T19:00:00", "value": {"PM2.5": 23.24}}, {"timestamp": "2014-10-06T20:00:00", "value": {"PM2.5": 24.93}}, {"timestamp": "2014-10-06T21:00:00", "value": {"PM2.5": 22.06}}, {"timestamp": "2014-10-06T22:00:00", "value": {"PM2.5": 22.0}}, {"timestamp": "2014-10-06T23:00:00", "value": {"PM2.5": 23.81}}, {"timestamp": "2014-10-07T00:00:00", "value": {"PM2.5": 35.09}}, {"timestamp": "2014-10-07T01:00:00", "value": {"PM2.5": 40.74}}, {"timestamp": "2014-10-07T02:00:00", "value": {"PM2.5": 42.5}}, {"timestamp": "2014-10-07T03:00:00", "value": {"PM2.5": 59.57}}, {"timestamp": "2014-10-07T04:00:00", "value": {"PM2.5": 56.78}}, {"timestamp": "2014-10-07T05:00:00", "value": {"PM2.5": 63.92}}, {"timestamp": "2014-10-07T06:00:00", "value": {"PM2.5": 69.31}}, {"timestamp": "2014-10-07T07:00:00", "value": {"PM2.5": 67.32}}, {"timestamp": "2014-10-07T08:00:00", "value": {"PM2.5": 78.97}}, {"timestamp": "2014-10-07T09:00:00", "value": {"PM2.5": 53.8}}, {"timestamp": "2014-10-07T10:00:00", "value": {"PM2.5": 51.59}}, {"timestamp": "2014-10-07T11:00:00", "value": {"PM2.5": 61.11}}, {"timestamp": "2014-10-07T12:00:00", "value": {"PM2.5": 77.53}}, {"timestamp": "2014-10-07T13:00:00", "value": {"PM2.5": 104.56}}, {"timestamp": "2014-10-07T14:00:00", "value": {"PM2.5": 97.35}}, {"timestamp": "2014-10-07T15:00:00", "value": {"PM2.5": 121.06}}, {"timestamp": "2014-10-07T16:00:00", "value": {"PM2.5": 189.34}}, {"timestamp": "2014-10-07T17:00:00", "value": {"PM2.5": 249.85}}, {"timestamp": "2014-10-07T18:00:00", "value": {"PM2.5": 273.11}}, {"timestamp": "2014-10-07T19:00:00", "value": {"PM2.5": 212.32}}, {"timestamp": "2014-10-07T20:00:00", "value": {"PM2.5": 205.69}}, {"timestamp": "2014-10-07T21:00:00", "value": {"PM2.5": 225.53}}, {"timestamp": "2014-10-07T22:00:00", "value": {"PM2.5": 266.97}}, {"timestamp": "2014-10-07T23:00:00", "value": {"PM2.5": 294.46}}, {"timestamp": "2014-10-08T00:00:00", "value": {"PM2.5": 310.99}}, {"timestamp": "2014-10-08T01:00:00", "value": {"PM2.5": 322.24}}, {"timestamp": "2014-10-08T02:00:00", "value": {"PM2.5": 333.67}}, {"timestamp": "2014-10-08T03:00:00", "value": {"PM2.5": 321.76}}, {"timestamp": "2014-10-08T04:00:00", "value": {"PM2.5": 331.7}}, {"timestamp": "2014-10-08T05:00:00", "value": {"PM2.5": 320.7}}, {"timestamp": "2014-10-08T06:00:00", "value": {"PM2.5": 309.12}}, {"timestamp": "2014-10-08T07:00:00", "value": {"PM2.5": 295.26}}, {"timestamp": "2014-10-08T08:00:00", "value": {"PM2.5": 302.19}}, {"timestamp": "2014-10-08T09:00:00", "value": {"PM2.5": 287.45}}, {"timestamp": "2014-10-08T10:00:00", "value": {"PM2.5": 273.93}}, {"timestamp": "2014-10-08T11:00:00", "value": {"PM2.5": 317.85}}, {"timestamp": "2014-10-08T12:00:00", "value": {"PM2.5": 322.9}}, {"timestamp": "2014-10-08T13:00:00", "value": {"PM2.5": 346.7}}, {"timestamp": "2014-10-08T14:00:00", "value": {"PM2.5": 393.7}}, {"timestamp": "2014-10-08T15:00:00", "value": {"PM2.5": 409.62}}, {"timestamp": "2014-10-08T16:00:00", "value": {"PM2.5": 441.96}}, {"timestamp": "2014-10-08T17:00:00", "value": {"PM2.5": 497.61}}, {"timestamp": "2014-10-08T18:00:00", "value": {"PM2.5": 542.4}}, {"timestamp": "2014-10-08T19:00:00", "value": {"PM2.5": 494.4}}, {"timestamp": "2014-10-08T20:00:00", "value": {"PM2.5": 505.14}}, {"timestamp": "2014-10-08T21:00:00", "value": {"PM2.5": 535.49}}, {"timestamp": "2014-10-08T22:00:00", "value": {"PM2.5": 602.83}}, {"timestamp": "2014-10-08T23:00:00", "value": {"PM2.5": 661.17}}, {"timestamp": "2014-10-09T00:00:00", "value": {"PM2.5": 667.53}}, {"timestamp": "2014-10-09T01:00:00", "value": {"PM2.5": 656.21}}, {"timestamp": "2014-10-09T02:00:00", "value": {"PM2.5": 644.98}}, {"timestamp": "2014-10-09T03:00:00", "value": {"PM2.5": 621.35}}, {"timestamp": "2014-10-09T04:00:00", "value": {"PM2.5": 611.46}}, {"timestamp": "2014-10-09T05:00:00", "value": {"PM2.5": 604.6}}, {"timestamp": "2014-10-09T06:00:00", "value": {"PM2.5": 602.84}}, {"timestamp": "2014-10-09T07:00:00", "value": {"PM2.5": 580.07}}, {"timestamp": "2014-10-09T08:00:00", "value": {"PM2.5": 585.6}}, {"timestamp": "2014-10-09T09:00:00", "value": {"PM2.5": 576.15}}, {"timestamp": "2014-10-09T10:00:00", "value": {"PM2.5": 562.81}}, {"timestamp": "2014-10-09T11:00:00", "value": {"PM2.5": 570.22}}, {"timestamp": "2014-10-09T12:00:00", "value": {"PM2.5": 568.22}}, {"timestamp": "2014-10-09T13:00:00", "value": {"PM2.5": 545.22}}, {"timestamp": "2014-10-09T14:00:00", "value": {"PM2.5": 545.43}}, {"timestamp": "2014-10-09T15:00:00", "value": {"PM2.5": 540.01}}, {"timestamp": "2014-10-09T16:00:00", "value": {"PM2.5": 531.11}}, {"timestamp": "2014-10-09T17:00:00", "value": {"PM2.5": 549.78}}, {"timestamp": "2014-10-09T18:00:00", "value": {"PM2.5": 539.85}}, {"timestamp": "2014-10-09T19:00:00", "value": {"PM2.5": 570.52}}, {"timestamp": "2014-10-09T20:00:00", "value": {"PM2.5": 611.39}}, {"timestamp": "2014-10-09T21:00:00", "value": {"PM2.5": 621.47}}, {"timestamp": "2014-10-09T22:00:00", "value": {"PM2.5": 619.53}}, {"timestamp": "2014-10-09T23:00:00", "value": {"PM2.5": 606.46}}, {"timestamp": "2014-10-10T00:00:00", "value": {"PM2.5": 620.15}}, {"timestamp": "2014-10-10T01:00:00", "value": {"PM2.5": 624.72}}, {"timestamp": "2014-10-10T02:00:00", "value": {"PM2.5": 619.74}}, {"timestamp": "2014-10-10T03:00:00", "value": {"PM2.5": 598.52}}, {"timestamp": "2014-10-10T04:00:00", "value": {"PM2.5": 597.64}}, {"timestamp": "2014-10-10T05:00:00", "value": {"PM2.5": 603.45}}, {"timestamp": "2014-10-10T06:00:00", "value": {"PM2.5": 624.04}}, {"timestamp": "2014-10-10T07:00:00", "value": {"PM2.5": 600.35}}, {"timestamp": "2014-10-10T08:00:00", "value": {"PM2.5": 603.37}}, {"timestamp": "2014-10-10T09:00:00", "value": {"PM2.5": 584.02}}, {"timestamp": "2014-10-10T10:00:00", "value": {"PM2.5": 554.25}}, {"timestamp": "2014-10-10T11:00:00", "value": {"PM2.5": 536.59}}, {"timestamp": "2014-10-10T12:00:00", "value": {"PM2.5": 507.22}}, {"timestamp": "2014-10-10T13:00:00", "value": {"PM2.5": 448.76}}, {"timestamp": "2014-10-10T14:00:00", "value": {"PM2.5": 447.68}}, {"timestamp": "2014-10-10T15:00:00", "value": {"PM2.5": 468.46}}, {"timestamp": "2014-10-10T16:00:00", "value": {"PM2.5": 476.16}}, {"timestamp": "2014-10-10T17:00:00", "value": {"PM2.5": 501.23}}, {"timestamp": "2014-10-10T18:00:00", "value": {"PM2.5": 476.19}}, {"timestamp": "2014-10-10T19:00:00", "value": {"PM2.5": 502.75}}, {"timestamp": "2014-10-10T20:00:00", "value": {"PM2.5": 488.49}}, {"timestamp": "2014-10-10T21:00:00", "value": {"PM2.5": 499.22}}, {"timestamp": "2014-10-10T22:00:00", "value": {"PM2.5": 513.88}}, {"timestamp": "2014-10-10T23:00:00", "value": {"PM2.5": 562.76}}, {"timestamp": "2014-10-11T00:00:00", "value": {"PM2.5": 532.6}}, {"timestamp": "2014-10-11T01:00:00", "value": {"PM2.5": 539.2}}, {"timestamp": "2014-10-11T02:00:00", "value": {"PM2.5": 539.5}}, {"timestamp": "2014-10-11T03:00:00", "value": {"PM2.5": 511.42}}, {"timestamp": "2014-10-11T04:00:00", "value": {"PM2.5": 494.12}}, {"timestamp": "2014-10-11T05:00:00", "value": {"PM2.5": 452.81}}, {"timestamp": "2014-10-11T06:00:00", "value": {"PM2.5": 449.28}}, {"timestamp": "2014-10-11T07:00:00", "value": {"PM2.5": 459.34}}, {"timestamp": "2014-10-11T08:00:00", "value": {"PM2.5": 476.61}}, {"timestamp": "2014-10-11T09:00:00", "value": {"PM2.5": 507.57}}, {"timestamp": "2014-10-11T10:00:00", "value": {"PM2.5": 458.59}}, {"timestamp": "2014-10-11T11:00:00", "value": {"PM2.5": 518.78}}, {"timestamp": "2014-10-11T12:00:00", "value": {"PM2.5": 522.39}}, {"timestamp": "2014-10-11T13:00:00", "value": {"PM2.5": 493.26}}, {"timestamp": "2014-10-11T14:00:00", "value": {"PM2.5": 448.23}}, {"timestamp": "2014-10-11T15:00:00", "value": {"PM2.5": 460.11}}, {"timestamp": "2014-10-11T16:00:00", "value": {"PM2.5": 513.12}}, {"timestamp": "2014-10-11T17:00:00", "value": {"PM2.5": 544.66}}, {"timestamp": "2014-10-11T18:00:00", "value": {"PM2.5": 530.0}}, {"timestamp": "2014-10-11T19:00:00", "value": {"PM2.5": 52.09}}, {"timestamp": "2014-10-11T20:00:00", "value": {"PM2.5": 10.52}}, {"timestamp": "2014-10-11T21:00:00", "value": {"PM2.5": 9.99}}, {"timestamp": "2014-10-11T22:00:00", "value": {"PM2.5": 6.62}}, {"timestamp": "2014-10-11T23:00:00", "value": {"PM2.5": 12.42}}, {"timestamp": "2014-10-12T00:00:00", "value": {"PM2.5": 6.05}}, {"timestamp": "2014-10-12T01:00:00", "value": {"PM2.5": 4.86}}, {"timestamp": "2014-10-12T02:00:00", "value": {"PM2.5": 4.78}}, {"timestamp": "2014-10-12T03:00:00", "value": {"PM2.5": 4.75}}, {"timestamp": "2014-10-12T04:00:00", "value": {"PM2.5": 6.49}}, {"timestamp": "2014-10-12T05:00:00", "value": {"PM2.5": 4.48}}, {"timestamp": "2014-10-12T06:00:00", "value": {"PM2.5": 4.0}}, {"timestamp": "2014-10-12T07:00:00", "value": {"PM2.5": 7.4}}, {"timestamp": "2014-10-12T08:00:00", "value": {"PM2.5": 44.28}}, {"timestamp": "2014-10-12T09:00:00", "value": {"PM2.5": 11.98}}, {"timestamp": "2014-10-12T10:00:00", "value": {"PM2.5": 7.86}}, {"timestamp": "2014-10-12T11:00:00", "value": {"PM2.5": 5.37}}, {"timestamp": "2014-10-12T12:00:00", "value": {"PM2.5": 4.19}}, {"timestamp": "2014-10-12T13:00:00", "value": {"PM2.5": 8.0}}, {"timestamp": "2014-10-12T14:00:00", "value": {"PM2.5": 4.62}}, {"timestamp": "2014-10-12T15:00:00", "value": {"PM2.5": 5.06}}, {"timestamp": "2014-10-12T16:00:00", "value": {"PM2.5": 4.29}}, {"timestamp": "2014-10-12T17:00:00", "value": {"PM2.5": 7.34}}, {"timestamp": "2014-10-12T18:00:00", "value": {"PM2.5": 7.85}}, {"timestamp": "2014-10-12T19:00:00", "value": {"PM2.5": 6.72}}, {"timestamp": "2014-10-12T20:00:00", "value": {"PM2.5": 5.16}}, {"timestamp": "2014-10-12T21:00:00", "value": {"PM2.5": 7.82}}, {"timestamp": "2014-10-12T22:00:00", "value": {"PM2.5": 10.13}}, {"timestamp": "2014-10-12T23:00:00", "value": {"PM2.5": 7.02}}, {"timestamp": "2014-10-13T00:00:00", "value": {"PM2.5": 5.91}}, {"timestamp": "2014-10-13T01:00:00", "value": {"PM2.5": 4.43}}, {"timestamp": "2014-10-13T02:00:00", "value": {"PM2.5": 4.17}}, {"timestamp": "2014-10-13T03:00:00", "value": {"PM2.5": 4.26}}, {"timestamp": "2014-10-13T04:00:00", "value": {"PM2.5": 4.16}}, {"timestamp": "2014-10-13T05:00:00", "value": {"PM2.5": 3.49}}, {"timestamp": "2014-10-13T06:00:00", "value": {"PM2.5": 3.22}}, {"timestamp": "2014-10-13T07:00:00", "value": {"PM2.5": 3.78}}, {"timestamp": "2014-10-13T08:00:00", "value": {"PM2.5": 6.02}}, {"timestamp": "2014-10-13T09:00:00", "value": {"PM2.5": 5.49}}, {"timestamp": "2014-10-13T10:00:00", "value": {"PM2.5": 3.18}}, {"timestamp": "2014-10-13T11:00:00", "value": {"PM2.5": 2.84}}, {"timestamp": "2014-10-13T12:00:00", "value": {"PM2.5": 4.08}}, {"timestamp": "2014-10-13T13:00:00", "value": {"PM2.5": 4.16}}, {"timestamp": "2014-10-13T14:00:00", "value": {"PM2.5": 5.6}}, {"timestamp": "2014-10-13T15:00:00", "value": {"PM2.5": 8.37}}, {"timestamp": "2014-10-13T16:00:00", "value": {"PM2.5": 11.02}}, {"timestamp": "2014-10-13T17:00:00", "value": {"PM2.5": 44.35}}, {"timestamp": "2014-10-13T18:00:00", "value": {"PM2.5": 59.91}}, {"timestamp": "2014-10-13T19:00:00", "value": {"PM2.5": 13.51}}, {"timestamp": "2014-10-13T20:00:00", "value": {"PM2.5": 11.44}}, {"timestamp": "2014-10-13T21:00:00", "value": {"PM2.5": 9.64}}, {"timestamp": "2014-10-13T22:00:00", "value": {"PM2.5": 15.66}}, {"timestamp": "2014-10-13T23:00:00", "value": {"PM2.5": 25.69}}, {"timestamp": "2014-10-14T00:00:00", "value": {"PM2.5": 21.18}}, {"timestamp": "2014-10-14T01:00:00", "value": {"PM2.5": 40.7}}, {"timestamp": "2014-10-14T02:00:00", "value": {"PM2.5": 29.56}}, {"timestamp": "2014-10-14T03:00:00", "value": {"PM2.5": 32.76}}, {"timestamp": "2014-10-14T04:00:00", "value": {"PM2.5": 51.26}}, {"timestamp": "2014-10-14T05:00:00", "value": {"PM2.5": 39.45}}, {"timestamp": "2014-10-14T06:00:00", "value": {"PM2.5": 38.68}}, {"timestamp": "2014-10-14T07:00:00", "value": {"PM2.5": 50.31}}, {"timestamp": "2014-10-14T08:00:00", "value": {"PM2.5": 31.9}}, {"timestamp": "2014-10-14T09:00:00", "value": {"PM2.5": 22.37}}, {"timestamp": "2014-10-14T10:00:00", "value": {"PM2.5": 20.02}}, {"timestamp": "2014-10-14T11:00:00", "value": {"PM2.5": 22.58}}, {"timestamp": "2014-10-14T12:00:00", "value": {"PM2.5": 24.72}}, {"timestamp": "2014-10-14T13:00:00", "value": {"PM2.5": -1.0}}, {"timestamp": "2014-10-14T14:00:00", "value": {"PM2.5": 37.88}}, {"timestamp": "2014-10-14T15:00:00", "value": {"PM2.5": 44.28}}, {"timestamp": "2014-10-14T16:00:00", "value": {"PM2.5": 76.53}}, {"timestamp": "2014-10-14T17:00:00", "value": {"PM2.5": 112.3}}, {"timestamp": "2014-10-14T18:00:00", "value": {"PM2.5": 117.97}}, {"timestamp": "2014-10-14T19:00:00", "value": {"PM2.5": 64.34}}, {"timestamp": "2014-10-14T20:00:00", "value": {"PM2.5": 55.34}}, {"timestamp": "2014-10-14T21:00:00", "value": {"PM2.5": 50.97}}, {"timestamp": "2014-10-14T22:00:00", "value": {"PM2.5": 48.59}}, {"timestamp": "2014-10-14T23:00:00", "value": {"PM2.5": 52.1}}, {"timestamp": "2014-10-15T00:00:00", "value": {"PM2.5": 52.31}}, {"timestamp": "2014-10-15T01:00:00", "value": {"PM2.5": 56.92}}, {"timestamp": "2014-10-15T02:00:00", "value": {"PM2.5": 54.36}}, {"timestamp": "2014-10-15T03:00:00", "value": {"PM2.5": 54.43}}, {"timestamp": "2014-10-15T04:00:00", "value": {"PM2.5": 142.32}}, {"timestamp": "2014-10-15T05:00:00", "value": {"PM2.5": 80.46}}, {"timestamp": "2014-10-15T06:00:00", "value": {"PM2.5": 105.69}}, {"timestamp": "2014-10-15T07:00:00", "value": {"PM2.5": 103.53}}, {"timestamp": "2014-10-15T08:00:00", "value": {"PM2.5": 106.21}}, {"timestamp": "2014-10-15T09:00:00", "value": {"PM2.5": 89.81}}, {"timestamp": "2014-10-15T10:00:00", "value": {"PM2.5": 109.88}}, {"timestamp": "2014-10-15T11:00:00", "value": {"PM2.5": 115.99}}, {"timestamp": "2014-10-15T12:00:00", "value": {"PM2.5": 33.9}}, {"timestamp": "2014-10-15T13:00:00", "value": {"PM2.5": 18.13}}, {"timestamp": "2014-10-15T14:00:00", "value": {"PM2.5": 21.07}}, {"timestamp": "2014-10-15T15:00:00", "value": {"PM2.5": 23.38}}, {"timestamp": "2014-10-15T16:00:00", "value": {"PM2.5": 12.68}}, {"timestamp": "2014-10-15T17:00:00", "value": {"PM2.5": 11.12}}, {"timestamp": "2014-10-15T18:00:00", "value": {"PM2.5": 11.13}}, {"timestamp": "2014-10-15T19:00:00", "value": {"PM2.5": 11.22}}, {"timestamp": "2014-10-15T20:00:00", "value": {"PM2.5": 10.27}}, {"timestamp": "2014-10-15T21:00:00", "value": {"PM2.5": 11.33}}, {"timestamp": "2014-10-15T22:00:00", "value": {"PM2.5": 12.96}}, {"timestamp": "2014-10-15T23:00:00", "value": {"PM2.5": 10.63}}, {"timestamp": "2014-10-16T00:00:00", "value": {"PM2.5": 6.99}}, {"timestamp": "2014-10-16T01:00:00", "value": {"PM2.5": 21.17}}, {"timestamp": "2014-10-16T02:00:00", "value": {"PM2.5": 7.95}}, {"timestamp": "2014-10-16T03:00:00", "value": {"PM2.5": 18.09}}, {"timestamp": "2014-10-16T04:00:00", "value": {"PM2.5": 19.63}}, {"timestamp": "2014-10-16T05:00:00", "value": {"PM2.5": 28.84}}, {"timestamp": "2014-10-16T06:00:00", "value": {"PM2.5": 30.77}}, {"timestamp": "2014-10-16T07:00:00", "value": {"PM2.5": 35.48}}, {"timestamp": "2014-10-16T08:00:00", "value": {"PM2.5": 41.14}}, {"timestamp": "2014-10-16T09:00:00", "value": {"PM2.5": 19.42}}, {"timestamp": "2014-10-16T10:00:00", "value": {"PM2.5": 19.65}}, {"timestamp": "2014-10-16T11:00:00", "value": {"PM2.5": 34.61}}, {"timestamp": "2014-10-16T12:00:00", "value": {"PM2.5": 46.08}}, {"timestamp": "2014-10-16T13:00:00", "value": {"PM2.5": 46.72}}, {"timestamp": "2014-10-16T14:00:00", "value": {"PM2.5": 47.4}}, {"timestamp": "2014-10-16T15:00:00", "value": {"PM2.5": 51.82}}, {"timestamp": "2014-10-16T16:00:00", "value": {"PM2.5": 68.41}}, {"timestamp": "2014-10-16T17:00:00", "value": {"PM2.5": 67.81}}, {"timestamp": "2014-10-16T18:00:00", "value": {"PM2.5": 200.82}}, {"timestamp": "2014-10-16T19:00:00", "value": {"PM2.5": 49.54}}, {"timestamp": "2014-10-16T20:00:00", "value": {"PM2.5": 60.66}}, {"timestamp": "2014-10-16T21:00:00", "value": {"PM2.5": 61.39}}, {"timestamp": "2014-10-16T22:00:00", "value": {"PM2.5": 61.92}}, {"timestamp": "2014-10-16T23:00:00", "value": {"PM2.5": 64.39}}]
						}

						//songscaper seed data
				// data = [{"start":0,"pitch":0,"value":0.712},{"start":0,"pitch":1,"value":0.288},{"start":0,"pitch":2,"value":0.156},{"start":0,"pitch":3,"value":0.156},{"start":0,"pitch":4,"value":0.192},{"start":0,"pitch":5,"value":0.225},{"start":0,"pitch":6,"value":0.485},{"start":0,"pitch":7,"value":0.429},{"start":0,"pitch":8,"value":0.653},{"start":0,"pitch":9,"value":0.572},{"start":0,"pitch":10,"value":1},{"start":0,"pitch":11,"value":0.251},{"start":0.17311,"pitch":0,"value":0.722},{"start":0.17311,"pitch":1,"value":0.398},{"start":0.17311,"pitch":2,"value":0.356},{"start":0.17311,"pitch":3,"value":0.512},{"start":0.17311,"pitch":4,"value":0.84},{"start":0.17311,"pitch":5,"value":0.899},{"start":0.17311,"pitch":6,"value":0.447},{"start":0.17311,"pitch":7,"value":0.677},{"start":0.17311,"pitch":8,"value":0.892},{"start":0.17311,"pitch":9,"value":0.989},{"start":0.17311,"pitch":10,"value":0.838},{"start":0.17311,"pitch":11,"value":1}]




    			data = pm25.data;


			    data.forEach(function(valueObj){
			      valueObj['date'] = timeFormat.parse(valueObj['timestamp']);
			      var day = valueObj['day'] = monthDayFormat(valueObj['date']);

			      var dayData = dailyValueExtent[day] = (dailyValueExtent[day] || [1000,-1]);
			      var pmValue = valueObj['value']['PM2.5'];
			      dayData[0] = d3.min([dayData[0],pmValue]);
			      dayData[1] = d3.max([dayData[1],pmValue]);
			    });

			    dateExtent = d3.extent(data,function(d){
			      return d.date;
			    });

			    // axisWidth = itemSize*(dayFormat(dateExtent[1])-dayFormat(dateExtent[0])+1);

			    // //render axises
			    // xAxis.scale(xAxisScale.range([0,axisWidth]).domain([dateExtent[0],dateExtent[1]]));  
			    // svg.append('g')
			    //   .attr('transform','translate('+margin.left+','+margin.top+')')
			    //   .attr('class','x axis')
			    //   .call(xAxis)
			    // .append('text')
			    //   .text('date')
			    //   .attr('transform','translate('+axisWidth+',-10)');

			    // svg.append('g')
			    //   .attr('transform','translate('+margin.left+','+margin.top+')')
			    //   .attr('class','y axis')
			    //   .call(yAxis)
			    // .append('text')
			    //   .text('time')
			    //   .attr('transform','translate(-10,'+axisHeight+') rotate(-90)');


// /* Example to draw polygon using D3.js */
// svg.append("polyline")
// .attr("points", "05,30 15,10 25,30")
// .attr("stroke-width", "2px")
// .attr("stroke", "black");

// var vis = d3.select("body").append("svg")
//          .attr("width", 1000)
//          .attr("height", 667),

// scaleX = d3.scale.linear()
//         .domain([-30,30])
//         .range([0,600]),

// scaleY = d3.scale.linear()
//         .domain([0,60])
//         .range([600,0]),

// poly = [{"x":0.0, "y":0.0},
//         {"x":0.0,"y":10.0},
//         {"x":10.0,"y":10.0},
//         {"x":10.0,"y":30.0},
//        {"x":30.0,"y":30.0},
//        {"x":30.0,"y":0.0},
//        {"x":0.0,"y":0.0}];

// var newpoly = poly.map(function(d) { return [scaleX(d.x),scaleY(d.y)]; });
// // newpoly is 2D array
// console.log(newpoly);

// vis.selectAll("polygon")
//     .data([newpoly])
//   .enter().append("polygon")
//     .attr("points",function(d) {
//         // d is 2D array
//         // default toString behavior for Array is join with comma        
//         return d.join(" ");
//     })
//     .attr("stroke","black")
//     .attr("stroke-width",2);



			    //render heatmap rects
			    dayOffset = dayFormat(dateExtent[0]);
			    rect = heatmap.selectAll('rect')
			      .data(data)
			    .enter().append('rect')
			      .attr('width',cellSize)
			      .attr('height',cellSize)
			      .attr('x',function(d){
			        return itemSize*(dayFormat(d.date)-dayOffset);
			      })
			      .attr('y',function(d){            
			        return hourFormat(d.date)*itemSize;
			      })
			      .attr('fill','#ffffff');

			    rect.filter(function(d){ return d.value['PM2.5']>0;})
			      .append('title')
			      .text(function(d){
			        return monthDayFormat(d.date)+' '+d.value['PM2.5'];
			      });

			    renderColor();


			  function initCalibration(){
			    d3.select('[role="calibration"] [role="example"]').select('svg')
			      .selectAll('rect').data(colorCalibration).enter()
			    .append('rect')
			      .attr('width',cellSize)
			      .attr('height',cellSize)
			      .attr('x',function(d,i){
			        return i*itemSize;
			      })
			      .attr('fill',function(d){
			        return d;
			      });

			    //bind click event
			    d3.selectAll('[role="calibration"] [name="displayType"]').on('click',function(){
			      renderColor();
			    });
			  }

			  function renderColor(){
			    var renderByCount = document.getElementsByName('displayType')[0].checked;

			    rect
			      .filter(function(d){
			        return (d.value['PM2.5']>=0);
			      })
			      .transition()
			      .delay(function(d){      
			        return (dayFormat(d.date)-dayOffset)*15;
			      })
			      .duration(500)
			      .attrTween('fill',function(d,i,a){
			        //choose color dynamicly      
			        var colorIndex = d3.scale.quantize()
			          .range([0,1,2,3,4,5])
			          .domain((renderByCount?[0,500]:dailyValueExtent[d.day]));

			        return d3.interpolate(a,colorCalibration[colorIndex(d.value['PM2.5'])]);
			      });
			  }
			  
			  //extend frame height in `http://bl.ocks.org/`
			  d3.select(self.frameElement).style("height", "600px");  
			
			  //close d3 service CB function
			});


        //close link function
      }
 


      //close return object
    };
  

    //close main directive CB function
  }]);