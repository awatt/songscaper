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