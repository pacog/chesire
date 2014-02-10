'use strict';

angular.module('chesireApp')
.directive('noteselector', function () {
    return {
        templateUrl: 'views/noteselector.html',
        restrict: 'E',
        scope: {
            'currentNote': '=',
            'noteList': '=',
            'noteIndex': '='
        },
        controller: 'NoteselectorCtrl'
    };
});
