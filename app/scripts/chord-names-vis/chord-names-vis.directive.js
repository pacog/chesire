(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('chordNamesVis', chordNamesVis);

    function chordNamesVis() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/chord-names-vis/chord-names-vis.tpl.html',
            scope: {},
            controller: 'ChordNamesVisController',
            controllerAs: 'vm'
        };
    }

})();