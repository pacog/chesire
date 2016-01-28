(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthoptionsAudioController', SynthoptionsAudioController);

    function SynthoptionsAudioController() {
        var vm = this;

        vm.components = vm.synthoptions.getActiveComponents();
        vm.activeComponent = vm.components[0];

        vm.activateComponent = activateComponent;

        function activateComponent(component) {
            vm.activeComponent = component;
        }
    }

})();