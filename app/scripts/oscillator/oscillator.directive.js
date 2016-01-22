(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('oscillator', oscillator);

    function oscillator() {
        return {
            templateUrl: 'scripts/oscillator/oscillator.html',
            restrict: 'E',
            controller: 'OscillatorController',
            controllerAs: 'vm'
        };
    }
})();
