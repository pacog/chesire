'use strict';

describe('Controller: SynthoptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('chesireApp'));

  var SynthoptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SynthoptionsCtrl = $controller('SynthoptionsCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
