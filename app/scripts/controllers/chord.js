'use strict';

angular.module('chesireApp')

.controller('ChordCtrl', function ($scope, $timeout, Scales) {

    $scope.notes = Scales.getAllNotes();
    $scope.$watch('chordInfo', function(newChord) {
        $scope.notesArray[$scope.chordIndex].name = newChord.name;
        $scope.notesArray[$scope.chordIndex].freq = newChord.freq;
    });
});
