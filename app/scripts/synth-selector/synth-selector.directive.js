(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('synthSelector', synthSelector);

    function synthSelector() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/synth-selector/synth-selector.tpl.html',
            scope: {},
            controller: 'SynthSelectorController',
            controllerAs: 'vm'
        };
    }

})();