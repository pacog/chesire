(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('chordNames', chordNames);

    function chordNames() {
        var factory = {
            getChordName: getChordName
        };

        return factory;

        function getChordName(chord) {
            if(chord.name) {
                return chord.name;
            }

            if(chord.notes && chord.notes.length) {

                return '(' + getLowerNote(chord.notes).name + ')';
            }

            return '-';
        }

        function getLowerNote(notes) {
            var lowerNote = notes[0];

            for(var i=1; i<notes.length; i++) {
                if(notes[i].freq < lowerNote.freq) {
                    lowerNote = notes[i];
                }
            }

            return lowerNote;
        }

    }

})();
