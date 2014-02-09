'use strict';

angular.module('chesireApp')

.directive('chord', function () {
    return {
        templateUrl: 'views/chord.html',
        restrict: 'E',
        scope: {
            'chordInfo': '=',
            'notesArray': '=',
            'chordIndex': '='
        },
        controller: 'ChordCtrl'
    };
});
