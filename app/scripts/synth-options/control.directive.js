'use strict';

angular.module('chesireApp')

.directive('control', function () {
    return {
        templateUrl: 'scripts/synth-options/control.html',
        restrict: 'E',
        scope: {
            controlInfo: '='
        },
        controller: 'ControlCtrl'
    };
});