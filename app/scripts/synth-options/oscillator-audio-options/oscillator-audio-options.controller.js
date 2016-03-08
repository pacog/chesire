(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('OscillatorAudioOptionsController', OscillatorAudioOptionsController);

    function OscillatorAudioOptionsController($timeout, $scope, SynthOptions, oscillatorTransitionTypes) {
        var vm = this;

        vm.lastSoundSourceIndex = 0;

        vm.mainParamsInSynthChanged = mainParamsInSynthChanged;
        vm.activateSoundSource = activateSoundSource;
        vm.oscillatorToggled = oscillatorToggled;

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
                vm.activeSoundSource = vm.synthOptions.oscillators[vm.lastSoundSourceIndex];
            }
        }

        function activateSoundSource(soundSource, index) {
            vm.activeSoundSource = soundSource;
            vm.lastSoundSourceIndex = index;
        }

        function mainParamsInSynthChanged() {
            SynthOptions.notifyOscillatorChanged();
        }

        function oscillatorToggled() {
            $timeout(function() {
                SynthOptions.notifyOscillatorChanged();
            });
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();