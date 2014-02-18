'use strict';

describe('Controller: NoteselectorCtrl', function() {

    // load the controller's module
    beforeEach(module('chesireApp'));

    var NoteselectorCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        NoteselectorCtrl = $controller('NoteselectorCtrl', {
            $scope: scope
        });
    }));

    // it('should attach a list of awesomeThings to the scope', function() {
    //     expect(scope.awesomeThings.length).toBe(3);
    // });
});