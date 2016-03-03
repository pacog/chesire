(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthoptionsAudioController', SynthoptionsAudioController);

    function SynthoptionsAudioController($timeout, $scope, SynthOptions) {
        var prevSynthOptions = null;

        var vm = this;

        vm.activateComponent = activateComponent;
        vm.componentToggled = componentToggled;
        vm.shouldShowOnOffForComponent = shouldShowOnOffForComponent;

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
                vm.activeComponent = vm.components[0];
            }
        }

        function activateComponent(component) {
            vm.activeComponent = component;
        }

        function componentToggled(component) {
            $timeout(function() { //TODO: ugly timeout, improve change-callbacks everywhere to not need it
                SynthOptions.notifyComponentChanged(component);
            });
        }

        function shouldShowOnOffForComponent(component) {
            if(component && (component.type !== 'oscillator')) {
                return true;
            }
            return false;
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();