(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthoptionsAudioController', SynthoptionsAudioController);

    function SynthoptionsAudioController($scope, SynthOptions, availableComponents, componentsList) {
        var prevSynthOptions = null;

        var vm = this;

        vm.addComponent = addComponent;
        vm.addOscillator = addOscillator;
        vm.addNoise = addNoise;

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

        function addOscillator() {
            var newOscillator = vm.audioSynthOptions.addOscillator();
            vm.componentsList.setActiveItem(newOscillator);
            SynthOptions.notifyOscillatorChanged();
        }

        function addNoise() {
            var newNoise = vm.audioSynthOptions.addNoise();
            vm.componentsList.setActiveItem(newNoise);
            SynthOptions.notifyOscillatorChanged();
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();