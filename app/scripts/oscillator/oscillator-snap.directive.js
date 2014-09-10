'use strict';

angular.module('chesireApp')

.directive('oscillatorSnap', function () {
    return {
        templateUrl: 'scripts/oscillator/oscillator-snap.html',
        restrict: 'E',
        scope: {
            componentInfo: '='
        }
    };
});