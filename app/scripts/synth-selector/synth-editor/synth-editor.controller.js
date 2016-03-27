(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthEditorController', SynthEditorController);

    function SynthEditorController($scope, $timeout, $log, UIService, synthSelector, outputModes, SynthOptions, SynthStore, SynthoptionsModel, fileSaver, modalFactory) {
        var vm = this;

        vm.outputModes = outputModes;

        vm.toggle = toggle;
        vm.outputModeChanged = outputModeChanged;
        vm.saveSynth = saveSynth;
        vm.askConfirmationDeleteSynth = askConfirmationDeleteSynth;
        vm.synthModified = synthModified;
        vm.createNewSynth = createNewSynth;
        vm.saveSynthAs = saveSynthAs;
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
                .then(successDeletingSynth, errorDeletingSynth);
        }

        function createNewSynth() {
            var modal = modalFactory.open({
                modalTitle: 'New synth',
                showCloseButton: true,
                templateUrl: 'scripts/synth-selector/add-synth/add-synth.tpl.html',
                controller: 'AddSynthController'
            });
            modal.result.then(function(synthName) {
                var newSynth = SynthoptionsModel.create();

                newSynth.name = synthName || 'New synth';
                SynthOptions.setSynthOptions(newSynth);
            });
        }

        function saveSynthAs() {
            var modal = modalFactory.open({
                modalTitle: 'Save synth as',
                showCloseButton: true,
                templateUrl: 'scripts/synth-selector/save-synth-as/save-synth-as.tpl.html',
                controller: 'SaveSynthAsController',
                resolve: {
                    'oldName': function() {
                        return vm.synthOptions.name;
                    }
                }
            });
            modal.result.then(function(synthName) {
                vm.synthOptions.name = synthName || vm.synthOptions.name;
                SynthStore.saveSynth(vm.synthOptions);
                synthSelector.notifySynthIsModified(false);
            });
        }

        function successDeletingSynth() {
            synthSelector.notifySynthIsModified(false);
        }

        function errorDeletingSynth(error) {
            $log.error(error);
        }

        function askConfirmationDeleteSynth() {
            vm.confirmingDeleteSynth = true;
            var modal = modalFactory.open({
                modalTitle: 'Do you really want to delete it?',
                showCloseButton: true,
                templateUrl: 'scripts/synth-selector/delete-synth/delete-synth.tpl.html',
                controller: 'DeleteSynthController'
            });
            modal.result.then(function(canDelete) {
                if(canDelete) {
                    deleteSynth();
                }
            });
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