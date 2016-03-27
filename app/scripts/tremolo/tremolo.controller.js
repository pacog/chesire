(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('TremoloController', TremoloController);

    function TremoloController($scope, $timeout, availableSimpleOscillators, SynthOptions, componentsList) {
        var vm = this;

        var notifyOptionsChangedThrottled = _.throttle(notifyOptionsChanged, 500);

        vm.availableOscillators = availableSimpleOscillators;

        vm.notifyOptionsChangedThrottled = notifyOptionsChangedThrottled;
        vm.toggleRate = toggleRate;
        vm.toggleDepth = toggleDepth;
        vm.removeComponent = removeComponent;

        init();

        function init() {
            vm.componentInfo = $scope.componentInfo;
            delete $scope.componentInfo;
        }

        function notifyOptionsChanged() {
            SynthOptions.notifyComponentChanged(vm.componentInfo);
        }

        function toggleRate() {
            vm.componentInfo.controls.rate.enabled = !vm.componentInfo.controls.rate.enabled;
            vm.notifyOptionsChangedThrottled();
        }

        function toggleDepth() {
            vm.componentInfo.controls.depth.enabled = !vm.componentInfo.controls.depth.enabled;
            vm.notifyOptionsChangedThrottled();
        }

        function removeComponent() {
            SynthOptions.removeComponent(vm.componentInfo);
            SynthOptions.notifyOscillatorChanged();
            componentsList.setActiveItem(null);
        }

    }

})();