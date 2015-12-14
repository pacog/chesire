(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('chordEditor', chordEditor);

    function chordEditor($q) {

        var _isOpen = false;
        var willEditChord;

        var factory = {
            showEditor: showEditor,
            isOpen: isOpen,
            close: closeSelector,
            notifyChordEdited: notifyChordEdited,
            chord: {}
        };

        return factory;

        function showEditor(chordToEdit) {
            willEditChord = $q.defer();

            factory.chord = angular.copy(chordToEdit);
            _isOpen = true;

            return willEditChord.promise;
        }

        function isOpen() {
            return _isOpen;
        }

        function closeSelector() {
            _isOpen = false;
        }

        function notifyChordEdited(chord) {
            if(willEditChord) {
                willEditChord.resolve(chord);
                willEditChord = null;
            }
        }

    }

})();