(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('startingNotes', startingNotes);

    function startingNotes(NoteList) {
        var factory = {
            get: get
        };

        return factory;

        function get() {
            var a220Index = _.findIndex(NoteList, function(note) {
                return note.freq === 220;
            });
            var notes = NoteList.slice(a220Index, a220Index + 12);
            return _.map(notes, function(note) {
                return {
                    'name': note.name.substring(0, note.name.length - 1), //Removing the last character, is the number of octave
                    'value': note
                };
            });
        }

    }

})();