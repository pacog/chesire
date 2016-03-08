(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('OscillatorAudioOptionsController', OscillatorAudioOptionsController);

    function OscillatorAudioOptionsController($scope, SynthOptions, oscillatorTransitionTypes) {
        var vm = this;

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
                vm.activeSoundSource = vm.synthOptions.oscillators[0];
            }
        }

        function activateSoundSource(soundSource) {
            vm.activeSoundSource = soundSource;
        }

        function mainParamsInSynthChanged() {
            SynthOptions.notifyOscillatorChanged();
        }

        function oscillatorToggled() {
            SynthOptions.notifyOscillatorChanged();
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();