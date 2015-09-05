(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('pulsateDetector', pulsateDetector);

    function pulsateDetector(pulsateFingerDetectorFactory) {

        var templateForNumberOfNotes = {
            '#1': ['middleFinger'],
            '#2': ['indexFinger', 'middleFinger'],
            '#3': ['indexFinger', 'middleFinger', 'ringFinger'],
            '#4': ['indexFinger', 'middleFinger', 'ringFinger', 'pinky'],
            '#5': ['thumb', 'indexFinger', 'middleFinger', 'ringFinger', 'pinky']
        };

        var pulsatedChord = null;
        var detectors = {};

        var factory = {
            applyNotePulsation: applyNotePulsation
        };

        init();
        return factory;

        function init() {
            detectors.pinky = pulsateFingerDetectorFactory.getDetector('pinky');
            detectors.thumb = pulsateFingerDetectorFactory.getDetector('thumb');
            detectors.indexFinger = pulsateFingerDetectorFactory.getDetector('indexFinger');
            detectors.ringFinger = pulsateFingerDetectorFactory.getDetector('ringFinger');
            detectors.middleFinger = pulsateFingerDetectorFactory.getDetector('middleFinger');
        }

        function applyNotePulsation(notesInfo, mainChordNow, motionParams) {
            //TODO something is wrong when notes are repeated between chords
            //TODO first time hand enters in chord, it sounds whitout pulse
            //TODO adjust thersold for each finger
            //TODO improve justStartedPulsating logic
            angular.forEach(detectors, function(detector) {
                var newStatus = detector.updateAndGetStatus(motionParams.fingersPulsationInfo[detector.id], mainChordNow);
                var relatedNotes = getRelatedNotes(mainChordNow.chord, notesInfo, detector.id);
                if(newStatus.justStartedPulsating) {
                    pulsatedChord = mainChordNow.index;
                    silenceAllNotes(relatedNotes);
                } else if(!newStatus.isPulsating) {
                    silenceAllNotes(relatedNotes);
                } else {
                    if(pulsatedChord !== mainChordNow.index) {
                        //Is pulsating but we changed chord
                        silenceAllNotes(relatedNotes);
                        detector.reset();
                    }
                }
            });

            notesInfo = silenceNotesNotFromChord(notesInfo, mainChordNow.chord);

            return notesInfo;
        }

        function getRelatedNotes(chord, notes, fingerId) {
            var numberOfNotes = '#' + chord.length;
            var pattern = null;
            if(templateForNumberOfNotes[numberOfNotes]) {
                pattern = templateForNumberOfNotes[numberOfNotes];
            } else {
                pattern = getDefaultPatternForNumber(chord.length);
            }

            return applyPatternToChord(chord, pattern, notes, fingerId);
        }

        function getDefaultPatternForNumber(numberOfNotes) {
            if(!numberOfNotes) {
                return [];
            }
            var result = [];
            for(var i=0; i<numberOfNotes; i++) {
                var fingerNumber = Math.floor(5*(i/numberOfNotes));
                var fingerName;
                switch(fingerNumber) {
                    case 0: fingerName = 'thumb'; break;
                    case 1: fingerName = 'indexFinger'; break;
                    case 2: fingerName = 'middleFinger'; break;
                    case 3: fingerName = 'ringFinger'; break;
                    case 4: fingerName = 'pinky'; break;
                }
                result.push(fingerName);
            }
            return result;
        }

        function applyPatternToChord(chord, pattern, notes, fingerId) {
            var result = [];
            for(var i=0; i<pattern.length; i++) {
                if(fingerId === pattern[i]) {
                    for(var j=0; j<notes.length; j++) {
                        if(notes[j].name === chord[i].name) {
                            result.push(notes[j]);
                            break;
                        }
                    }
                }
            }

            return result;
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