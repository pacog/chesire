'use strict';

angular.module('chesireApp')

.directive('singleControlHud', function () {

    return {
        templateUrl: 'scripts/controls-hud/single-control-hud.html',
        restrict: 'E',
        scope: {
            controlInfo: '=',
            relatedParam: '@'
        },
        controller: 'SingleControlHudCtrl'
    };
});