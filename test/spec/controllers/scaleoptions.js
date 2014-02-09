'use strict';

describe('Controller: ScaleoptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('chesireApp'));

  var ScaleoptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScaleoptionsCtrl = $controller('ScaleoptionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
