(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthEditorController', SynthEditorController);

    function SynthEditorController($scope, $timeout, UIService, outputModes, SynthOptions, synthEditor, SynthStore) {
        var vm = this;

        vm.outputModes = outputModes;

        vm.toggle = toggle;
        vm.outputModeChanged = outputModeChanged;
        vm.saveSynth = saveSynth;
        vm.deleteSynth = deleteSynth;
        vm.askConfirmationDeleteSynth = askConfirmationDeleteSynth;
        vm.cancelDeleteSynth = cancelDeleteSynth;
        vm.synthModified = synthModified;

        vm.synthEditor = synthEditor;
        vm.synthHasBeenModified = false;

        init();

        function init() {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);

            UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);

            $scope.$on('$destroy', onDestroy);
        }

        function synthModified() {
            vm.synthHasBeenModified = true;
        }

        function saveSynth() {
            SynthStore.saveSynth(vm.synthOptions);
        }

        function deleteSynth() {
            SynthStore.deleteSynth(vm.synthOptions);
            vm.confirmingDeleteSynth = false;
        }

        function askConfirmationDeleteSynth() {
            vm.confirmingDeleteSynth = true;
        }

        function cancelDeleteSynth() {
            vm.confirmingDeleteSynth = false;
        }

        function outputModeChanged() {
            //TODO: maybe better to notify change in a more subtle way
            SynthOptions.setSynthOptions(vm.synthOptions);
        }

        function synthOptionsChanged(newSynthOptions) {
            $timeout(function() {
                if(newSynthOptions !== vm.synthOptions) {
                    vm.synthOptions = newSynthOptions;
                }
            });
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