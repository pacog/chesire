(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('oscillatorWaveSelector', oscillatorWaveSelector);

    function oscillatorWaveSelector() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/oscillator/oscillator-wave-selector/oscillator-wave-selector.tpl.html',
            controller: 'OscillatorWaveSelectorController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                config: '=',
                changeCallback: '&'
            }
        };
    }

})();