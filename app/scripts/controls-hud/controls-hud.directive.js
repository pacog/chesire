(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('controlsHud', controlsHud);

    function controlsHud() {
        return {
            templateUrl: 'scripts/controls-hud/controls-hud.html',
            restrict: 'E',
            scope: {},
            controller: 'ControlsHudController',
            controllerAs: 'vm'
        };
    }
})();
