'use strict';

angular.module('songscaperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('graph', {
        url: '/graph',
        templateUrl: 'app/graph/graph.html',
        controller: 'GraphCtrl'
      });
  });