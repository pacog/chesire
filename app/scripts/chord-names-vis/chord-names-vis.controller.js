(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ChordNamesVisController', ChordNamesVisController);

    function ChordNamesVisController(ScaleOptions, VisualizationKeyHelper, Leapmotion) {
        var vm = this;

        vm.MIN_OPACITY = 0.3;

        vm.getChordName = getChordName;
        vm.getChordOpacity = getChordOpacity;

        init();

        function init() {
            ScaleOptions.getScaleOptions().then(scaleChanged);
            ScaleOptions.subscribeToChangesInScaleOptions(scaleChanged);
            Leapmotion.subscribeToFrameChange(frameChange);
        }

        function scaleChanged(newScale) {
            if(newScale) {
                vm.chords = angular.copy(newScale.chords);
                setVolumeTo0();
            }
        }

        function getChordName(chord) {
            if(chord.name) {
                return chord.name;
            }

            if(chord.notes && chord.notes.length) {
                return '(' + chord.notes[0].name + ')';
            }

            return '-';
        }

        function getChordOpacity(chord) {
            if(chord.volume) {
                return chord.volume*(1-vm.MIN_OPACITY) + vm.MIN_OPACITY;
            }
            return vm.MIN_OPACITY;
        }

        function frameChange(frameInfo) {
            var frame = frameInfo.frame;
            if(frame && frame.hands && frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var chordsVolumeInfo = VisualizationKeyHelper.getKeyRangesVolume(relativePositions.x);
                for(var i=0; i<chordsVolumeInfo.length; i++) {
                    updateChordWithVolume(i, chordsVolumeInfo[i]);
                }
            } else {
                setVolumeTo0();
            }
        }

        function updateChordWithVolume(i, volume) {
            if(vm.chords && vm.chords[i]) {
                vm.chords[i].volume = volume;
            }
        }

        function setVolumeTo0() {
            if(vm.chords && vm.chords.length) {
                for(var i=0; i<vm.chords.length; i++) {
                    vm.chords[i].volume = 0;
                }
            }
        }

    }

})();