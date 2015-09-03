'use strict';

describe('Dummy app', function () {

  // load the controller's module
  beforeEach(module('chesireApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
  }));

  it('should do a dummy test', function () {
    expect(true).toBe(true);
  });
});