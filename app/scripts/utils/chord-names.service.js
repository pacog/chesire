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
                return '(' + chord.notes[0].name + ')';
            }

            return '-';
        }

    }

})();
