(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('oscillatorSnap', oscillatorSnap);

    function oscillatorSnap() {
        return {
            templateUrl: 'scripts/oscillator/oscillator-snap.html',
            restrict: 'E',
            scope: {
                componentInfo: '=',
                changeCallback: '&'
            },
            controller: 'OscillatorSnapController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();


