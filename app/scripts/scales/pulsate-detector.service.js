(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('pulsateDetector', pulsateDetector);

    function pulsateDetector() {
        var pulsating = false;
        var pulsatedChord = null;
        var PULSATION_ON_THRESHOLD = -300;
        var PULSATION_OFF_THRESHOLD = 400;

        var factory = {
            applyNotePulsation: applyNotePulsation
        };
        return factory;

        function applyNotePulsation(notesInfo, mainChordNow, motionParams) {
            var fingerInfo = motionParams.fingersPulsationInfo.middleFinger;

            if(!pulsating && velocityYIsPulsating(fingerInfo)) {
                pulsating = true;
                pulsatedChord = mainChordNow.index;
            } else if(pulsating && fingerIsGoingOff(fingerInfo)) {
                pulsating = false;
                pulsatedChord = null;
            }

            notesInfo = silenceNotesNotFromChord(notesInfo, mainChordNow.chord);

            if(!pulsating) {
                notesInfo = silenceAllNotes(notesInfo);
            } else if(pulsatedChord !== mainChordNow.index) {
                //Still pulsating, but changed chord
                pulsating = false;
                pulsatedChord = null;
                silenceAllNotes(notesInfo);
            }
            return notesInfo;
        }

        function velocityYIsPulsating(fingerInfo) {
            var yVelocityIsEnough = (fingerInfo.yVelocity < PULSATION_ON_THRESHOLD);
            var otherVelocityIsNotHigh = Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.xVelocity) && Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.zVelocity);
            return yVelocityIsEnough && otherVelocityIsNotHigh;
        }

        function fingerIsGoingOff(fingerInfo) {
            var yVelocityIsEnough = (fingerInfo.yVelocity > PULSATION_OFF_THRESHOLD);
            var otherVelocityIsNotHigh = Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.xVelocity) && Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.zVelocity);
            return yVelocityIsEnough && otherVelocityIsNotHigh;
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