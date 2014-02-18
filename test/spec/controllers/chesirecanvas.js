'use strict';

describe('Controller: ChesirecanvasctrlCtrl', function() {

    // load the controller's module
    beforeEach(module('chesireApp'));

    var ChesirecanvasctrlCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ChesirecanvasctrlCtrl = $controller('ChesirecanvasctrlCtrl', {
            $scope: scope
        });
    }));

    // it('should attach a list of awesomeThings to the scope', function () {
    //   expect(scope.awesomeThings.length).toBe(3);
    // });
});