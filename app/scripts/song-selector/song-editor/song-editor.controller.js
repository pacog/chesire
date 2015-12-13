(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongEditorController', SongEditorController);

    function SongEditorController(chordNames) {
        var vm = this;

        var CHORDS_TWO_ROWS_LIMIT = 5;

        vm.getChordName = getChordName;
        vm.isChordInSecondRow = isChordInSecondRow;

        function getChordName(chord) {
            return chordNames.getChordName(chord);
        }

        function isChordInSecondRow($index) {
            return ((vm.song.chords.length > CHORDS_TWO_ROWS_LIMIT) && ($index%2)===1);
        }

    }

})();