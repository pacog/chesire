'use strict';

describe('Controller: PapercanvasCtrl', function() {

    // load the controller's module
    beforeEach(module('chesireApp'));

    var PapercanvasCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        PapercanvasCtrl = $controller('PapercanvasCtrl', {
            $scope: scope
        });
    }));

    // it('should attach a list of awesomeThings to the scope', function () {
    //   expect(scope.awesomeThings.length).toBe(3);
    // });
});