(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('OscillatorAudioOptionsController', OscillatorAudioOptionsController);

    function OscillatorAudioOptionsController($timeout, $scope, SynthOptions, oscillatorTransitionTypes) {
        var vm = this;

        vm.lastSoundSourceIndex = 0;
        vm.noiseActive = false;

        vm.mainParamsInSynthChanged = mainParamsInSynthChanged;
        vm.activateSoundSource = activateSoundSource;
        vm.oscillatorToggled = oscillatorToggled;
        vm.activateNoise = activateNoise;
        vm.noiseGeneratorToggled = noiseGeneratorToggled;

        init();

        function init() {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            vm.transitionTypes = oscillatorTransitionTypes;
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            if(newSynthOptions) {
                vm.synthOptions = newSynthOptions.audio;
                vm.mainVolumeInfo = newSynthOptions.audio.controls.gain;
                if(vm.noiseActive) {
                    vm.activeSoundSource = vm.synthOptions.noise;
                } else {
                    vm.activeSoundSource = vm.synthOptions.oscillators[vm.lastSoundSourceIndex];
                }
            }
        }

        function activateSoundSource(soundSource, index) {
            vm.activeSoundSource = soundSource;
            vm.lastSoundSourceIndex = index;
            vm.noiseActive = false;
        }

        function activateNoise(noise) {
            vm.noiseActive = true;
            vm.activeSoundSource = noise;
        }

        function mainParamsInSynthChanged() {
            SynthOptions.notifyOscillatorChanged();
        }

        function oscillatorToggled() {
            $timeout(function() {
                SynthOptions.notifyOscillatorChanged();
            });
        }

        function noiseGeneratorToggled() {
            $timeout(function() {
                SynthOptions.notifyOscillatorChanged();
            });
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();