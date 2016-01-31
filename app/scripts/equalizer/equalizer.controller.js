(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('EqualizerController', EqualizerController);

    function EqualizerController($scope, availableEqTypes, SynthOptions) {
        var vm = this;

        vm.FREQ_STEP = 5;
        vm.Q_STEP = 0.1;

        vm.availableEqTypes = availableEqTypes;

        vm.eqTypeChanged = eqTypeChanged;
        vm.toggleFrequency = toggleFrequency;
        vm.toggleQ = toggleQ;
        vm.toggleGain = toggleGain;
        vm.notifyOptionsChanged = notifyOptionsChanged;

        init();

        function init() {
            vm.componentInfo = $scope.componentInfo;
            delete $scope.componentInfo;
        }

        function eqTypeChanged() {
            notifyOptionsChanged();
        }

        function toggleFrequency() {
            vm.componentInfo.controls.freq.enabled = !vm.componentInfo.controls.freq.enabled;
            notifyOptionsChanged();
        }

        function toggleQ() {
            vm.componentInfo.controls.q.enabled = !vm.componentInfo.controls.q.enabled;
            notifyOptionsChanged();
        }

        function toggleGain() {
            vm.componentInfo.controls.gain.enabled = !vm.componentInfo.controls.gain.enabled;
            notifyOptionsChanged();
        }

        function notifyOptionsChanged() {
            SynthOptions.notifyComponentChanged(vm.componentInfo);
        }

    }

})();