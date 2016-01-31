(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('DistortionController', DistortionController);

    function DistortionController($scope, SynthOptions) {
        var vm = this;

        vm.toggleAmount = toggleAmount;
        vm.notifyOptionsChanged = notifyOptionsChanged;

        init();

        function init() {
            vm.componentInfo = $scope.componentInfo;
            delete $scope.componentInfo;
        }

        function toggleAmount() {
            vm.componentInfo.controls.amount.enabled = !vm.componentInfo.controls.amount.enabled;
            notifyOptionsChanged();
        }

        function notifyOptionsChanged() {
            SynthOptions.notifyComponentChanged(vm.componentInfo);
        }
    }

})();