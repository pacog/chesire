(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('notesKeyboard', notesKeyboard);

    function notesKeyboard() {
        return {
            restrict: 'E',
            scope: {
                notes: '='
            },
            templateUrl: 'scripts/notes-keyboard/notes-keyboard.tpl.html',
            controller: 'NotesKeyboardController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();