(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('DelayController', DelayController);

    function DelayController($scope, SynthOptions, componentsList) {
        var vm = this;

        vm.DELAY_STEP = 0.01;

        vm.toggleDelay = toggleDelay;
        vm.toggleFeedback = toggleFeedback;
        vm.notifyOptionsChanged = notifyOptionsChanged;
        vm.removeComponent = removeComponent;

        init();

        function init() {
            vm.componentInfo = $scope.componentInfo;
            delete $scope.componentInfo;
        }

        function toggleDelay() {
            vm.componentInfo.controls.delay.enabled = !vm.componentInfo.controls.delay.enabled;
            notifyOptionsChanged();
        }

        function toggleFeedback() {
            vm.componentInfo.controls.feedback.enabled = !vm.componentInfo.controls.feedback.enabled;
            notifyOptionsChanged();
        }


        function notifyOptionsChanged() {
            SynthOptions.notifyComponentChanged(vm.componentInfo);
        }

        function removeComponent() {
            SynthOptions.removeComponent(vm.componentInfo);
            SynthOptions.notifyOscillatorChanged();
            componentsList.setActiveItem(null);
        }

    }

})();