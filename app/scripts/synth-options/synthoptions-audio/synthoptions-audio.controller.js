(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthoptionsAudioController', SynthoptionsAudioController);

    function SynthoptionsAudioController($timeout, $scope, SynthOptions) {
        var prevSynthOptions = null;

        var vm = this;

        vm.activateComponent = activateComponent;
        vm.componentToggled = componentToggled;
        vm.activateOscillator = activateOscillator;
        vm.activateMain = activateMain;

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
                vm.activeComponent = null;
            }
        }

        function activateComponent(component) {
            vm.activeComponent = component;
        }

        function activateOscillator() {
            vm.activeComponent = null;
        }

        function activateMain() {
            vm.activeComponent = null;
        }

        function componentToggled(component) {
            $timeout(function() { //TODO: ugly timeout, improve change-callbacks everywhere to not need it
                SynthOptions.notifyComponentChanged(component);
            });
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();