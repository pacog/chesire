(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthEditorController', SynthEditorController);

    function SynthEditorController($scope, $timeout, $log, UIService, synthSelector, outputModes, SynthOptions, SynthStore, SynthoptionsModel, fileSaver) {
        var vm = this;

        vm.outputModes = outputModes;

        vm.toggle = toggle;
        vm.outputModeChanged = outputModeChanged;
        vm.saveSynth = saveSynth;
        vm.deleteSynth = deleteSynth;
        vm.askConfirmationDeleteSynth = askConfirmationDeleteSynth;
        vm.cancelDeleteSynth = cancelDeleteSynth;
        vm.synthModified = synthModified;
        vm.createNewSynth = createNewSynth;
        vm.saveSynthToFile = saveSynthToFile;
        vm.fileSaver = fileSaver;
        vm.synthLoaded = synthLoaded;

        vm.synthHasBeenModified = false;

        init();

        function init() {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);

            synthSelector.subscribeToSynthIsModified(synthIsModifiedChanged);

            UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);

            $scope.$on('$destroy', onDestroy);
        }

        function synthModified() {
            synthSelector.notifySynthIsModified(true);
        }

        function synthIsModifiedChanged(isNowModified) {
            vm.synthHasBeenModified = isNowModified;
        }

        function saveSynth() {
            SynthStore.saveSynth(vm.synthOptions);
            synthSelector.notifySynthIsModified(false);
        }

        function saveSynthToFile() {
            fileSaver.save(vm.synthOptions, vm.synthOptions.name || 'synth');
        }

        function synthLoaded(loadedSynth) {
            if(checkLoadedSynthIsCorrect(loadedSynth)) {
                loadedSynth.name = SynthStore.getUniqueName(loadedSynth.name);
                vm.song = loadedSynth;
                SynthOptions.setSynthOptions(loadedSynth);
                synthSelector.notifySynthIsModified(true);
            }
        }

        function checkLoadedSynthIsCorrect(synth) {
            if(synth && synth.audio && synth.audio.components && synth.audio.oscillators) {
                return true;
            }
            return false;
        }

        function deleteSynth() {
            SynthStore.deleteSynth(vm.synthOptions)
                .then(successDeletingSynth, errorDeletingSynth)
                ['finally'](afterDeletingSynth);
        }

        function createNewSynth() {
            var newSynth = SynthoptionsModel.create();

            newSynth.name = 'New synth';
            SynthOptions.setSynthOptions(newSynth);
        }

        function successDeletingSynth() {
            synthSelector.notifySynthIsModified(false);
        }

        function errorDeletingSynth(error) {
            $log.error(error);
        }

        function afterDeletingSynth() {
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