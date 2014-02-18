'use strict';

angular.module('chesireApp')

.controller('ChordCtrl', function ($scope, Scales) {

    $scope.allNotes = angular.copy(Scales.getAllNotes());

    angular.forEach($scope.chordInfo.notes, function(selectedNote) {
        angular.forEach($scope.allNotes, function(note) {
            if(note.name === selectedNote.name) {
                note.selected = true;
            }
        });
    });
});
