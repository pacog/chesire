/* global Network */

(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('pulsateDetectorChord', pulsateDetectorChord);

    function pulsateDetectorChord(neuralNetworkStore, Leapmotion, pulsateFingerDetectorFactory) {

        var neuralNetwork;
        var detector;
        var isPulsating = false;

        var factory = {
            applyNotePulsation: applyNotePulsation
        };

        init();
        return factory;

        function init() {
            var json = neuralNetworkStore.get();
            neuralNetwork = Network.fromJSON(json);
            detector = pulsateFingerDetectorFactory.getDetector('middleFinger');
        }

        function applyNotePulsation(notesInfo, mainChordNow, motionParams, frameInfo) {

            var newInfoLines = getInfoArrayFromFrame(frameInfo);
            var output = neuralNetwork.activate(newInfoLines.params)[0];

            if(output > 0.5) {
                notesInfo = silenceNotesNotFromChord(notesInfo, mainChordNow.chord);
                isPulsating = true;
            } else {
                var isOff = detector.updateAndDetectOff(motionParams.fingersPulsationInfo[detector.id], mainChordNow, frameInfo);
                if(isOff || !isPulsating) {
                    isPulsating = false;
                    silenceAllNotes(notesInfo);
                }
            }

            return notesInfo;
        }

        function getInfoArrayFromFrame(frameInfo) {
            var time = (new Date()).getTime();
            var motionParams = false;
            if(frameInfo && frameInfo.hands && frameInfo.hands[0]) {
                motionParams = Leapmotion.getRelativePositions(frameInfo, frameInfo.hands);
            }
            var info = {
                time: time,
                params: [
                    motionParams ? motionParams.fingersPulsationInfo.middleFinger.xVelocity : 0,
                    motionParams ? motionParams.fingersPulsationInfo.middleFinger.yVelocity : 0,
                    motionParams ? motionParams.fingersPulsationInfo.middleFinger.zVelocity : 0,
                    motionParams ? motionParams.fingersDirectionInfo.middleFinger.xDirection : 0,
                    motionParams ? motionParams.fingersDirectionInfo.middleFinger.yDirection : 0,
                    motionParams ? motionParams.fingersDirectionInfo.middleFinger.zDirection : 0
                ]
            };
            
            return info;
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