(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ComponentsListController', ComponentsListController);

    function ComponentsListController($scope, $timeout, SynthOptions, componentsList) {
        var vm = this;

        var prevSynthOptions = null;

        vm.componentsList = componentsList;
        vm.componentToggled = componentToggled;
        vm.addOscillator = addOscillator;
        vm.addNoise = addNoise;

        init();

        function init() {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            if(prevSynthOptions !== newSynthOptions) {
                vm.synthoptions = newSynthOptions;
                vm.components = vm.synthoptions.getActiveComponents();
                vm.audioSynthOptions = vm.synthoptions.audio;
            }
        }

        function componentToggled(component) {
            $timeout(function() { //TODO: ugly timeout, improve change-callbacks everywhere to not need it
                SynthOptions.notifyComponentChanged(component);
            });
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