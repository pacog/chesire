(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('OscillatorController', OscillatorController);

    function OscillatorController($scope, $timeout, oscillatorTransitionTypes, availableOscillators, SynthOptions) {
        var vm = this;

        var notifyComponentChangedThrottled = _.throttle(SynthOptions.notifyOscillatorChanged, 500);
        var notifyOscillatorOptionsChangedThrottled = _.throttle(notifyOscillatorOptionsChanged, 500);

        vm.oscillatorOptionsChanged = oscillatorOptionsChanged;
        vm.notifyOscillatorOptionsChangedThrottled = notifyOscillatorOptionsChangedThrottled;
        vm.gainControllerInfoChanged = gainControllerInfoChanged;
        vm.fmToggle = fmToggle;
        vm.toggleGainControl = toggleGainControl;

        init();

        function init() {
            vm.transitionTypes = oscillatorTransitionTypes;
            // vm.midiControlModes = oscillatorMidiControlModes;
            vm.availableOscillators = availableOscillators;
        }

        function gainControllerInfoChanged() {
            notifyComponentChangedThrottled(vm.oscillatorConfig);
        }

        function toggleGainControl() {
            vm.oscillatorConfig.controls.gain.enabled = !vm.oscillatorConfig.controls.gain.enabled;
            gainControllerInfoChanged();
        }

        function fmToggle() {
            $timeout(function() { //TODO: ugly timeout, improve change-callbacks everywhere to not need it
                notifyOscillatorOptionsChanged(vm.oscillatorConfig);
            });
        }

        function notifyOscillatorOptionsChanged() {
            SynthOptions.notifyOscillatorChanged();
        }

        function oscillatorOptionsChanged() {
            notifyOscillatorOptionsChangedThrottled();
        }
    }

})();
