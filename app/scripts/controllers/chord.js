'use strict';

angular.module('chesireApp')

.controller('ChordCtrl', function ($scope, $window, Scales, ChordStore) {

    var init = function() {

        $scope.allNotes = angular.copy(Scales.getAllNotes());
        $scope.$watch('chordInfo.name', $scope.selectedChordChanged, true);
        // $scope.$watchCollection('chordInfo.chords', $scope.selectedChordChanged, true);
        $scope.$watch('chordAlreadyExisting', chordExistingChange, true);
        ChordStore.getChords().then(chordsStoreChanged);
        ChordStore.subscribeToChangeInAllChords(chordsStoreChanged);
        $scope.updateSelectedNotes();
    };

    $scope.selectedChordChanged = function() {
        $scope.updateSelectedNotes();
        $scope.onChordChange($scope.chordIndex, $scope.chordInfo);
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

    $scope.onNameFocus = function() {
        $scope.showSelectorList = true;
    };

    $scope.onNameBlur = function() {
        $scope.showSelectorList = false;
    };

    $scope.selectChord = function(chord) {
        $scope.chordInfo = angular.copy(chord);
        chordsStoreChanged($scope.allChords);
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
        chordsStoreChanged($scope.allChords);
        $scope.onChordChange($scope.chordIndex, $scope.chordInfo);
    };

    var chordsStoreChanged = function(allChords) {
        $scope.allChords = allChords;
        $scope.chordAlreadyExisting = false;
        angular.forEach(allChords, function(chord){
            if(Scales.isSameChord(chord, $scope.chordInfo)) {
                $scope.chordAlreadyExisting = true;
                $scope.chordInfo = angular.copy(chord);
            }
        });
        if(!$scope.chordAlreadyExisting) {
            $scope.chordInfo.name = '';
        }
    };

    var chordExistingChange = function(chordIsExistingNow) {
        if(!chordIsExistingNow) {
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

    init();
});
