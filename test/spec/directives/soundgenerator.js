'use strict';

describe('Directive: SoundGenerator', function () {

  // load the directive's module
  beforeEach(module('chesireApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-sound-generator></-sound-generator>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the SoundGenerator directive');
  }));
});
