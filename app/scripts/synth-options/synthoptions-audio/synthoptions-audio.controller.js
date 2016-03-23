(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthoptionsAudioController', SynthoptionsAudioController);

    function SynthoptionsAudioController($scope, SynthOptions, availableComponents, componentsList) {
        var prevSynthOptions = null;

        var vm = this;

        vm.addComponent = addComponent;

        vm.availableComponents = availableComponents;
        vm.componentsList = componentsList;

        init();

        function init() {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            if(prevSynthOptions !== newSynthOptions) {
                vm.synthoptions = newSynthOptions;
                prevSynthOptions = vm.synthoptions;
                vm.components = vm.synthoptions.getActiveComponents();
                vm.audioSynthOptions = vm.synthoptions.audio;
                vm.componentsList.setActiveItem(null);
            }
        }

        function addComponent(typeOfComponent) {
            var newComponent = vm.audioSynthOptions.addComponent(typeOfComponent);
            vm.componentsList.setActiveItem(newComponent);
            SynthOptions.notifyOscillatorChanged();
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();