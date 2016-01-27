(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('oscillatorFm', oscillatorFm);

    function oscillatorFm() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/oscillator/oscillator-fm/oscillator-fm.tpl.html',
            scope: {
                component: '=',
                changeCallback: '&'
            },
            controller: 'OscillatorFmController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();