'use strict';

angular.module('chesireApp')

.directive('controlsHud', function () {

    return {
        templateUrl: 'scripts/controls-hud/controls-hud.html',
        restrict: 'E',
        scope: {
        },
        controller: 'ControlsHudCtrl'
    };
});