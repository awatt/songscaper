'use strict';

describe('Directive: modelChart', function () {

  // load the directive's module
  beforeEach(module('songscaperApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<model-chart></model-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modelChart directive');
  }));
});