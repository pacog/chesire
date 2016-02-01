(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthSelectorController', SynthSelectorController);

    function SynthSelectorController($scope, SynthOptions, UIService, hotKeys, SynthStore, synthEditor) {
        var vm = this;

        var UI_SERVICE_MENU_ID = 'synth-selector';

        vm.synthHasBeenModified = false;

        vm.toggleSynthList = toggleSynthList;
        vm.toggleSynthEditor = toggleSynthEditor;
        vm.goToNextSynth = goToNextSynth;
        vm.goToPrevSynth = goToPrevSynth;

        init();

        function init() {
            vm.loadingFirstSynth = true;
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            SynthStore.subscribeToChangeInAllSynths(synthsStoreChanged);
            UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);
            synthEditor.subscribeToSynthChanged(synthModified);
            hotKeys.on('NEXT_SYNTH', goToNextSynth);
            hotKeys.on('PREV_SYNTH', goToPrevSynth);
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynth) {
            vm.loadingFirstSynth = false;
            if(newSynth) {
                vm.currentSynth = angular.copy(newSynth);
                updateSelectedSynthIndex();
                synthEditor.notifySynthHasChanged(false);
            }
        }

        function onDeletedSynth() {
            if(vm.synths.length === 0) {
                // vm.synths[0] = angular.copy(DefaultScale);
            }
            if(vm.indexOfSelectedSynth >= vm.synths.length) {
                vm.indexOfSelectedSynth = vm.synths.length - 1;
            }
            SynthOptions.setSynthOptions(vm.synths[vm.indexOfSelectedSynth]);
        }

        function synthModified(isSynthModified) {
            vm.synthHasBeenModified = isSynthModified;
            if(isSynthModified) {
                //TODO: this is not needed, right? or maybe only when changing name?
                // SynthOptions.setSynthOptions(vm.currentSynth);
            }
        }

        function toggleSynthList() {
            vm.showSynthList = !vm.showSynthList;
            if(vm.showSynthList) {
                vm.synthEditorShown = false;
                UIService.notifyMenuOpen(UI_SERVICE_MENU_ID);
            }
        }

        function toggleSynthEditor() {
            vm.synthEditorShown = !vm.synthEditorShown;
            if(vm.synthEditorShown) {
                vm.showSynthList = false;
                UIService.notifyMenuOpen(UI_SERVICE_MENU_ID);
            }
        }

        function checkIfShouldCloseMenu(newMenuOpened) {
            if(newMenuOpened !== UI_SERVICE_MENU_ID) {
                vm.synthEditorShown = false;
                vm.showSynthList = false;
            }
        }

        function goToNextSynth() {
            if(vm.synths && (vm.indexOfSelectedSynth < (vm.synths.length - 1))) {
                vm.indexOfSelectedSynth++;
                SynthOptions.setSynthOptions(vm.synths[vm.indexOfSelectedSynth]);
            }
        }

        function goToPrevSynth() {
            if(vm.synths && (vm.indexOfSelectedSynth > 0)) {
                vm.indexOfSelectedSynth--;
                SynthOptions.setSynthOptions(vm.synths[vm.indexOfSelectedSynth]);
            }
        }

        function synthsStoreChanged(newSynths, deletedSynth) {
            vm.synths = newSynths;
            if(deletedSynth) {
                onDeletedSynth();
            } else {
                updateSelectedSynthIndex();
            }
        }

        function updateSelectedSynthIndex() {
            if(vm.synths && vm.currentSynth) {
                vm.indexOfSelectedSynth = _.findIndex(vm.synths, function(eachSynth) {
                    return vm.currentSynth && (eachSynth.name === vm.currentSynth.name);
                });
            }
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
            SynthStore.unsubscribeToChangeInAllSynths(synthsStoreChanged);
            synthEditor.unsubscribeToSynthChanged(synthModified);
            hotKeys.off('NEXT_SYNTH', goToNextSynth);
            hotKeys.off('PREV_SYNTH', goToPrevSynth);
        }
    }

})();