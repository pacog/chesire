(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('OscillatorFmController', OscillatorFmController);

    function OscillatorFmController() {
        var vm = this;

        vm.componentChanged = componentChanged;
        vm.toggleDepthControl = toggleDepthControl;
        vm.togglePreModulator = togglePreModulator;

        function componentChanged() {
            if(angular.isFunction(vm.changeCallback)) {
                vm.changeCallback();
            }
        }

        function toggleDepthControl() {
            vm.component.controls.depth.enabled = !vm.component.controls.depth.enabled;
            componentChanged();
        }

        function togglePreModulator() {
            vm.component.preModulator.enabled = !vm.component.preModulator.enabled;
            componentChanged();
        }

    }

})();