'use strict';

angular.module('chesireApp')

.controller('NoteselectorCtrl', function ($scope, Scales) {

    $scope.allNotes = Scales.getAllNotes();

    $scope.$watch('currentNote', function(newNote) {
         $scope.noteList[$scope.noteIndex].name = newNote.name;
         $scope.noteList[$scope.noteIndex].freq = newNote.freq;
    });
});
