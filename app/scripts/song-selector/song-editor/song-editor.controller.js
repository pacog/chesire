(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongEditorController', SongEditorController);

    function SongEditorController($scope, chordNames, chordSelector, songEditor) {
        var vm = this;

        var CHORDS_TWO_ROWS_LIMIT = 5;

        vm.getChordName = getChordName;
        vm.isChordInSecondRow = isChordInSecondRow;
        vm.pickChord = pickChord;
        vm.removeChord = removeChord;
        vm.addChordBefore = addChordBefore;
        vm.addChordLast = addChordLast;

        vm.songEditor = songEditor;
        vm.songHasBeenModified = false;

        init();

        function init() {
            songEditor.subscribeToSongChanged(songModified);
            $scope.$on('$destroy', onDestroy);
        }

        function songModified(isSongModified) {
            vm.songHasBeenModified = isSongModified;
        }

        function getChordName(chord) {
            return chordNames.getChordName(chord);
        }

        function isChordInSecondRow($index) {
            return ((vm.song.chords.length > CHORDS_TWO_ROWS_LIMIT) && ($index%2)===1);
        }

        function pickChord(index, chords) {
            chordSelector.showSelector().then(function(chordChosen) {
                chords[index] = chordChosen;
                songEditor.notifySongHasChanged(true);
            });
        }

        function removeChord(index, chords) {
            if(chords.length > 2) {
                chords.splice(index, 1);
            } else {
                chords[index].notes = [];
                chords[index].name = undefined;
            }
            songEditor.notifySongHasChanged(true);
        }

        function addChordBefore(index) {
            vm.song.chords.splice(index, 0, getEmptyChord());
            songEditor.notifySongHasChanged(true);
        }

        function addChordLast() {
            vm.song.chords.push(getEmptyChord());
            songEditor.notifySongHasChanged(true);
        }

        function getEmptyChord() {
            return {
                name: undefined,
                notes: []
            };
        }

        function onDestroy() {
            songEditor.unsubscribeToSongChanged(songModified);
        }

    }

})();