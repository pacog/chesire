(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('chordSelector', chordSelector);

    function chordSelector($q, NoteList) {

        var _isOpen = false;
        var willGetChord;

        var factory = {
            showSelector: showSelector,
            isOpen: isOpen,
            close: closeSelector,
            notifyChordSelected: notifyChordSelected,
            getChordFromParams: getChordFromParams
        };
        return factory;

        function showSelector() {
            willGetChord = $q.defer();

            _isOpen = true;

            return willGetChord.promise;
        }

        function isOpen() {
            return _isOpen;
        }

        function closeSelector() {
            _isOpen = false;
        }

        function notifyChordSelected(chord) {
            if(willGetChord) {
                willGetChord.resolve(chord);
                willGetChord = null;
            }
        }

        function getChordFromParams(key, mood, numberOfNotes) {
            var chord = {
                name: key.name.substring(0, key.name.length - 1) + ' ' + mood.name,
                notes: []
            };

            var startingNote = _.findIndex(NoteList, function(note) {
                return note.freq === key.freq;
            });
            var currentStepInInterval = 0;

            for(var i=startingNote; (i<NoteList.length) && (chord.notes.length < numberOfNotes); i++) {
                if(mood.intervals[currentStepInInterval]) {
                    chord.notes.push(angular.copy(NoteList[i]));
                }
                currentStepInInterval ++;
                if(currentStepInInterval >= mood.intervals.length) {
                    currentStepInInterval = 0;
                }
            }

            return chord;
        }

    }

})();