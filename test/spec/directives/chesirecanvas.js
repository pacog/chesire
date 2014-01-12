'use strict';

describe('Directive: chesirecanvas', function () {

  // load the directive's module
  beforeEach(module('chesireApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chesirecanvas></chesirecanvas>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chesirecanvas directive');
  }));
});
