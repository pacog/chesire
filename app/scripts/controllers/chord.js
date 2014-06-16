'use strict';

angular.module('chesireApp')

.controller('ChordCtrl', function ($scope, $window, Scales, ChordStore) {

    $scope.init = function() {

        $scope.allNotes = angular.copy(Scales.getAllNotes());
        $scope.$watch('chordInfo', $scope.selectedChordChanged, true);
        ChordStore.getChords().then(chordsStoreChanged);
        ChordStore.subscribeToChangeInAllChords(chordsStoreChanged);
        $scope.updateSelectedNotes();
    };

    $scope.selectedChordChanged = function() {

        $scope.updateSelectedNotes();
        $scope.updateChordInListOfChords();
    };

    $scope.updateSelectedNotes = function() {

        angular.forEach($scope.allNotes, function(note) {
            note.selected = false;
        });
        angular.forEach($scope.chordInfo.notes, function(selectedNote) {
            angular.forEach($scope.allNotes, function(note) {
                if(note.name === selectedNote.name) {
                    note.selected = true;
                }
            });
        });
    };

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
        $scope.updateChordInListOfChords();
    };

    $scope.updateChordInListOfChords = function() {

        if(angular.toJson($scope.chordsArray[$scope.chordsIndex]) !== angular.toJson($scope.chordInfo)) {

            $scope.chordsArray[$scope.chordIndex].name = $scope.chordInfo.name;
            $scope.chordsArray[$scope.chordIndex].notes = angular.copy($scope.chordInfo.notes);
        }
    };

    var chordsStoreChanged = function(allChords) {
        $scope.allChords = allChords;
        $scope.chordAlreadyExisting = false;
        angular.forEach(allChords, function(chord){
            if(Scales.isSameChord(chord, $scope.chordInfo)) {
                $scope.chordAlreadyExisting = chord;
                $scope.chordInfo = chord;
            }
        });
        if(!$scope.chordAlreadyExisting) {
            $scope.chordInfo.name = '';
        }
    };

    $scope.saveChord = function() {

        $scope.loading = true;
        ChordStore.saveChord($scope.chordInfo)['finally'](function() {
            $scope.loading = false;
        });
    };
    $scope.deleteChord = function() {

        $scope.loading = true;
        ChordStore.deleteChord($scope.chordInfo)['finally'](function() {
            $scope.loading = false;
        });
    };

    $scope.init();
});
