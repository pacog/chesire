(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('OscillatorController', OscillatorController);

    function OscillatorController($scope, oscillatorTransitionTypes, oscillatorMidiControlModes, availableOscillators, SynthOptions) {
        var vm = this;

        var notifyComponentChangedThrottled = _.throttle(SynthOptions.notifyComponentChanged, 500);
        var notifyOscillatorOptionsChangedThrottled = _.throttle(notifyOscillatorOptionsChanged, 500);

        vm.oscillatorOptionsChanged = oscillatorOptionsChanged;
        vm.notifyOscillatorOptionsChangedThrottled = notifyOscillatorOptionsChangedThrottled;
        vm.gainControllerInfoChanged = gainControllerInfoChanged;

        init();

        function init() {

            //Kind of ugly, should pass this parameter so we don't have to manually link it in vm
            vm.componentInfo = $scope.componentInfo;
            delete $scope.componentInfo;

            vm.transitionTypes = oscillatorTransitionTypes;
            vm.midiControlModes = oscillatorMidiControlModes;
            vm.availableOscillators = availableOscillators;

            SynthOptions.getSynthOptions().then(function() { //This get is just to wait for them to be ready
                SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
                startWatchingForChanges();
            });
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            vm.synthOptions = newSynthOptions;

            if(newSynthOptions && newSynthOptions.getActiveComponents()) {
                var oscillatorInfo = newSynthOptions.getOscillatorComponent();
                vm.gainControllerInfo = oscillatorInfo.controls.gain;
            }
            
            if(vm.synthOptions && vm.synthOptions.isMidiOutput()) {
                vm.componentInfo.transitionType = 'volume';
            }
        }

        function startWatchingForChanges() {
            //TODO: all this should be done with ng-change in each of the components
            $scope.$watch('vm.componentInfo.snapDistance', notifyOscillatorOptionsChangedThrottled);
        }

        function gainControllerInfoChanged() {
            notifyComponentChangedThrottled(vm.componentInfo);
        }

        function notifyOscillatorOptionsChanged() {
            SynthOptions.notifyComponentChanged(vm.componentInfo);
        }

        function oscillatorOptionsChanged() {
            notifyOscillatorOptionsChangedThrottled();
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();
