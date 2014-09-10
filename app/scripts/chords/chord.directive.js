'use strict';

angular.module('chesireApp')

.directive('chord', function () {
    return {
        templateUrl: 'scripts/chords/chord.html',
        restrict: 'E',
        scope: {
            'chordInfo': '=',
            'chordsArray': '=',
            'chordIndex': '=',
            'onChordChange': '='
        },
        controller: 'ChordCtrl'
    };
});
