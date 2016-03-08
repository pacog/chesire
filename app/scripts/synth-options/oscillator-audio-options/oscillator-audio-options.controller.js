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
            //TODO: notify synthoptions in a correct way
        }

        function oscillatorToggled() {
            //TODO: notify synthoptions in a correct way
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();