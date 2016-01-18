(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('synthoptionsMidi', synthoptionsMidi);

    function synthoptionsMidi() {
        return {
            restrict: 'E',
            controller: 'SynthoptionsMidiController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'scripts/synth-options/synthoptions-midi/synthoptions-midi.tpl.html'
        };
    }

})();