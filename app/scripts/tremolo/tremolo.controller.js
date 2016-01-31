(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('TremoloController', TremoloController);

    function TremoloController($scope, $timeout, availableSimpleOscillators, SynthOptions) {
        var vm = this;

        var notifyOptionsChangedThrottled = _.throttle(notifyOptionsChanged, 500);

        vm.availableOscillators = availableSimpleOscillators;

        vm.notifyOptionsChangedThrottled = notifyOptionsChangedThrottled;
        vm.toggleRate = toggleRate;
        vm.toggleDepth = toggleDepth;

        init();

        function init() {

            vm.componentInfo = $scope.componentInfo;
            delete $scope.componentInfo;

            //TODO: remove synthOptions?
            SynthOptions.getSynthOptions().then(function() { //This get is just to wait for them to be ready
                SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            });
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            vm.synthOptions = newSynthOptions;
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


        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }

    }

})();