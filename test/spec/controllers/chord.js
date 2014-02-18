'use strict';

describe('Controller: ChordCtrl', function() {

    // load the controller's module
    beforeEach(module('chesireApp'));

    var ChordCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ChordCtrl = $controller('ChordCtrl', {
            $scope: scope
        });
    }));
});