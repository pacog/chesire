'use strict';

describe('Controller: MidigeneratorCtrl', function() {

    // load the controller's module
    beforeEach(module('chesireApp'));

    var MidigeneratorCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MidigeneratorCtrl = $controller('MidigeneratorCtrl', {
            $scope: scope
        });
    }));

    // it('should attach a list of awesomeThings to the scope', function () {
    //   expect(scope.awesomeThings.length).toBe(3);
    // });
});