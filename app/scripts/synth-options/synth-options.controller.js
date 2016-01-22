(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthOptionsController', SynthOptionsController);

    function SynthOptionsController($scope, UIService, outputModes, SynthOptions) {
        var vm = this;

        vm.outputModes = outputModes;

        vm.toggle = toggle;

        init();

        function init() {

            SynthOptions.getSynthOptions().then(function() { //This get is just to wait for them to be ready
                SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            });
            UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);

            //TODO: use on-change for selector
            $scope.$watch('vm.synthOptions.outputMode', function(newOutputMode) {
                if(newOutputMode) {
                    SynthOptions.setSynthOptions(vm.synthOptions);
                }
            });

            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            vm.synthOptions = newSynthOptions;
        }

        function checkIfShouldCloseMenu(newMenuOpened) {
            if(newMenuOpened !== 'synth-options') {
                vm.expanded = false;
            }
        }

        function toggle() {
            vm.expanded = !$scope.expanded;
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
