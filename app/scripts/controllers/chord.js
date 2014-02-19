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

    $scope.selectNote = function(noteName) {

        angular.forEach($scope.allNotes, function(note) {
            if(note.name === noteName) {
                if(note.selected) {
                    $scope.chordInfo.notes = _.without($scope.chordInfo.notes, _.findWhere($scope.chordInfo.notes, {name: noteName}));
                } else {
                    $scope.chordInfo.notes.push(note);
                }
                note.selected = !note.selected;
            }
        });
    };
});
