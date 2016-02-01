(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('synthList', synthList);

    function synthList() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/synth-selector/synth-list/synth-list.tpl.html',
            scope: {
                synths: '=',
                selectedSynth: '='
            },
            controller: 'SynthListController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();