'use strict';

angular.module('chesireApp')

.controller('ChordCtrl', function ($scope, $window, Scales, ChordStore) {


    //TODO: when chord changes, show the edit part of it,
    //otherwise just show the select chord utility (select with search)

    $scope.init = function() {

        $scope.allNotes = angular.copy(Scales.getAllNotes());

        $scope.$watch('allChords', $scope.chordsStoreChanged, true);

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
    };

    // $scope.chordSelected = function(chord) {
    //     debugger;
    // };

    $scope.chordsStoreChanged = function(allChords) {

        $scope.chordAlreadyExisting = false;
        angular.forEach(allChords, function(chord){
            if(Scales.isSameChord(chord, $scope.chordInfo)) {
                $scope.chordAlreadyExisting = chord;
            }
        });
    };

    $scope.saveChord = function() {

        $scope.loading = true;
        ChordStore.saveChord($scope.chordInfo).then(

            function(savedChord) {

                $scope.allChords[savedChord.name] = savedChord;
                $window.alert('saved!');
            }, function(error) {

                $window.alert(error);
            })['finally'](function() {

                $scope.loading = false;
            });
    };
    $scope.deleteChord = function() {

        ChordStore.removeChord($scope.chordInfo);
    };

    $scope.init();
});
