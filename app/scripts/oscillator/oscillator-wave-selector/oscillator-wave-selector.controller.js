(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('OscillatorWaveSelectorController', OscillatorWaveSelectorController);

    function OscillatorWaveSelectorController($scope, $timeout) {
        var vm = this;

        vm.realValueChanged = realValueChanged;
        vm.imaginaryValueChanged = imaginaryValueChanged;

        init();

        function init() {
            $scope.$watch('vm.config', configChanged);
        }

        function configChanged(newConfig) {
            if(newConfig) {
                vm.realPeriodicTableValues = [];
                for(var i=0; i<newConfig.realPeriodicTable.length; i++) {
                    vm.realPeriodicTableValues.push({
                        value: newConfig.realPeriodicTable[i] + ''
                    });
                }
                vm.imaginaryPeriodicTableValues = [];
                for(i=0; i<newConfig.imaginaryPeriodicTable.length; i++) {
                    vm.imaginaryPeriodicTableValues.push({
                        value: newConfig.imaginaryPeriodicTable[i] + ''
                    });
                }
            }
        }

        function realValueChanged($index) {
            $timeout(function() {
                vm.config.realPeriodicTable[$index] = parseFloat(vm.realPeriodicTableValues[$index].value);
                vm.changeCallback();
            });
        }

        function imaginaryValueChanged($index) {
            $timeout(function() {
                vm.config.imaginaryPeriodicTable[$index] = parseFloat(vm.imaginaryPeriodicTableValues[$index].value);
                vm.changeCallback();
            });
        }
    }

})();