(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthoptionsAudioController', SynthoptionsAudioController);

    function SynthoptionsAudioController($timeout, SynthOptions) {
        var vm = this;

        vm.components = vm.synthoptions.getActiveComponents();
        vm.activeComponent = vm.components[0];

        vm.activateComponent = activateComponent;
        vm.componentToggled = componentToggled;
        vm.shouldShowOnOffForComponent = shouldShowOnOffForComponent;

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
    }

})();