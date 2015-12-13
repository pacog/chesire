(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongEditorController', SongEditorController);

    function SongEditorController(chordNames, chordSelector) {
        var vm = this;

        var CHORDS_TWO_ROWS_LIMIT = 5;

        vm.getChordName = getChordName;
        vm.isChordInSecondRow = isChordInSecondRow;
        vm.pickChord = pickChord;
        vm.removeChord = removeChord;
        vm.addChordBefore = addChordBefore;
        vm.addChordLast = addChordLast;

        function getChordName(chord) {
            return chordNames.getChordName(chord);
        }

        function isChordInSecondRow($index) {
            return ((vm.song.chords.length > CHORDS_TWO_ROWS_LIMIT) && ($index%2)===1);
        }

        function pickChord(index, chords) {
            chordSelector.showSelector().then(function(chordChosen) {
                chords[index] = chordChosen;
            });
        }

        function removeChord(index, chords) {
            if(chords.length > 2) {
                chords.splice(index, 1);
            } else {
                chords[index].notes = [];
                chords[index].name = undefined;
            }
        }

        function addChordBefore(index) {
            vm.song.chords.splice(index, 0, getEmptyChord());
        }

        function addChordLast() {
            vm.song.chords.push(getEmptyChord());
        }

        function getEmptyChord() {
            return {
                name: undefined,
                notes: []
            };
        }

    }

})();