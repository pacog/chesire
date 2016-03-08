(function() {
    'use strict';

    angular.module('chesireApp')
        .component('oscillator', {
            templateUrl: 'scripts/oscillator/oscillator.html',
            controller: 'OscillatorController as vm',
            bindings: {
                'oscillatorConfig': '='
            }
        });

})();
