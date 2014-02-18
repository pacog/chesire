'use strict';

describe('Controller: SoundgeneratorCtrl', function() {

    // load the controller's module
    beforeEach(module('chesireApp'));

    var SoundgeneratorCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        SoundgeneratorCtrl = $controller('SoundgeneratorCtrl', {
            $scope: scope
        });
    }));

    // it('should attach a list of awesomeThings to the scope', function () {
    //   expect(scope.awesomeThings.length).toBe(3);
    // });
});