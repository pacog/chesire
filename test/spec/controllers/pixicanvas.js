'use strict';

describe('Controller: PixicanvasCtrl', function () {

  // load the controller's module
  beforeEach(module('chesireApp'));

  var PixicanvasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PixicanvasCtrl = $controller('PixicanvasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
