(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('pulsateDetector', pulsateDetector);

    function pulsateDetector(pulsateFingerDetectorFactory) {

        var pulsatedChord = null;
        var middleFingerDetector = null;

        var factory = {
            applyNotePulsation: applyNotePulsation
        };

        init();
        return factory;

        function init() {
            middleFingerDetector = pulsateFingerDetectorFactory.getDetector('middleFinger');
            debugger;
        }

        function applyNotePulsation(notesInfo, mainChordNow, motionParams) {
            var fingerInfo = motionParams.fingersPulsationInfo.middleFinger;
            var newStatus = middleFingerDetector.updateAndGetStatus(fingerInfo, mainChordNow);

            if(newStatus.justStartedPulsating) {
                pulsatedChord = mainChordNow.index;
                silenceAllNotes(notesInfo);
            } else if(!newStatus.isPulsating) {
                silenceAllNotes(notesInfo);
            } else {
                if(pulsatedChord !== mainChordNow.index) {
                    //Is pulsating but we changed chord
                    silenceAllNotes(notesInfo);
                    middleFingerDetector.reset();
                }
            }

            notesInfo = silenceNotesNotFromChord(notesInfo, mainChordNow.chord);

            return notesInfo;
        }

        function silenceAllNotes(notesInfo) {
            for(var i=0; i<notesInfo.length; i++) {
                notesInfo[i].gain = 0;
            }
            return notesInfo;

        }

        function silenceNotesNotFromChord(notesInfo, chord) {
            if(chord) {
                for(var i=0; i<notesInfo.length; i++) {
                    if(!noteIsInChord(notesInfo[i], chord)) {
                        notesInfo[i].gain = 0;
                    }
                }
            }
            return notesInfo;
        }

        function noteIsInChord(note, chord) {
            if(note && chord) {
                for(var i=0; i<chord.length; i++) {
                    if(chord[i].name === note.name) {
                        return true;
                    }
                }
            }
            return false;
        }

    }
})();