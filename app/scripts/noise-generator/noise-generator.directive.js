(function() {
    'use strict';

    angular.module('chesireApp')
        .component('noiseGenerator', {
            bindings: {
                noiseConfig: '='
            },
            templateUrl: 'scripts/noise-generator/noise-generator.tpl.html',
            controller: 'NoiseGeneratorController as vm'
        });
})();