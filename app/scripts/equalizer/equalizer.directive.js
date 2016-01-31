(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('equalizer', equalizer);

    function equalizer() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/equalizer/equalizer.tpl.html',
            controller: 'EqualizerController',
            controllerAs: 'vm'
        };
    }

})();