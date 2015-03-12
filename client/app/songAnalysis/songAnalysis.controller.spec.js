'use strict';

describe('Controller: SongAnalysisCtrl', function () {

  // load the controller's module
  beforeEach(module('songscaperApp'));

  var SongAnalysisCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SongAnalysisCtrl = $controller('SongAnalysisCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
