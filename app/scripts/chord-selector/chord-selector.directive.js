(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('chordSelector', chordSelector);

    function chordSelector() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/chord-selector/chord-selector.tpl.html',
            scope: {},
            controller: 'ChordSelectorController',
            controllerAs: 'vm'
        };
    }

})();