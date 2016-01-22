(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthOptionsController', SynthOptionsController);

    function SynthOptionsController($scope, UIService, outputModes, SynthOptions) {
        var vm = this;

        vm.outputModes = outputModes;

        vm.toggle = toggle;
        vm.outputModeChanged = outputModeChanged;

        init();

        function init() {

            SynthOptions.getSynthOptions().then(function() { //This get is just to wait for them to be ready
                SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            });
            UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);

            $scope.$on('$destroy', onDestroy);
        }

        function outputModeChanged() {
            //TODO: maybe better to notify change in a more subtle way
            SynthOptions.setSynthOptions(vm.synthOptions);
        }

        function synthOptionsChanged(newSynthOptions) {
            if(newSynthOptions !== vm.synthOptions) {
                vm.synthOptions = newSynthOptions;
            }
        }

        function checkIfShouldCloseMenu(newMenuOpened) {
            if(newMenuOpened !== 'synth-options') {
                vm.expanded = false;
            }
        }

        function toggle() {
            vm.expanded = !vm.expanded;
            if(vm.expanded) {
                UIService.notifyMenuOpen('synth-options');
            }
        }

        function onDestroy() {
            UIService.unsubscribeToMenuOpening(checkIfShouldCloseMenu);
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }

    }
})();
