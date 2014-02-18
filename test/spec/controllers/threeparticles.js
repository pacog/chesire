'use strict';

describe('Controller: ThreeparticlesCtrl', function() {

    // load the controller's module
    beforeEach(module('chesireApp'));

    var ThreeparticlesCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ThreeparticlesCtrl = $controller('ThreeparticlesCtrl', {
            $scope: scope
        });
    }));

    // it('should attach a list of awesomeThings to the scope', function() {
    //     expect(scope.awesomeThings.length).toBe(3);
    // });
});