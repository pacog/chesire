(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('OscillatorSnapController', OscillatorSnapController);

    function OscillatorSnapController($timeout) {
        var vm = this;

        vm.valueChanged = valueChanged;

        function valueChanged() {
            $timeout(vm.changeCallback);
        }
    }

})();