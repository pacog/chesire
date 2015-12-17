(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ChordNamesVisController', ChordNamesVisController);

    function ChordNamesVisController(ScaleOptions, VisualizationKeyHelper, Leapmotion, chordNames, playerBoundaries) {
        var vm = this;

        vm.MIN_OPACITY = 0.3;
        vm.CHORDS_TWO_COLUMNS_LIMIT = 5;
        vm.SECOND_CHORD_BOTTOM = 40;

        vm.getChordName = getChordName;
        vm.getChordOpacity = getChordOpacity;
        vm.getChordLeft = getChordLeft;
        vm.getChordBottom = getChordBottom;

        init();

        function init() {
            ScaleOptions.getScaleOptions().then(scaleChanged);
            ScaleOptions.subscribeToChangesInScaleOptions(scaleChanged);
            Leapmotion.subscribeToFrameChange(frameChange);
            playerBoundaries.subscribeToChange(changeInBoundaries);
        }

        function changeInBoundaries(newBoundaries) {
            if(newBoundaries) {
                vm.width = Math.round(newBoundaries.max.x - newBoundaries.min.x);
                console.log('vm.width ' + vm.width);
            }
        }

        function scaleChanged(newScale) {
            if(newScale) {
                vm.chords = angular.copy(newScale.chords);
                setVolumeTo0();
            }
        }

        function getChordName(chord) {
            return chordNames.getChordName(chord);
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

        function getChordLeft(index, total) {
            if(total > 1) {
                return Math.round(10000*((index/100)/(total - 1))) + '%';
            }
            return '50%';
            
        }

        function getChordBottom(index, total) {
            if((total > vm.CHORDS_TWO_COLUMNS_LIMIT) && (index%2 === 1) ) {
                return vm.SECOND_CHORD_BOTTOM + 'px';
            }
            return '0px';
        }

    }

})();