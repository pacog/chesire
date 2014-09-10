'use strict';

angular.module('chesireApp')

.directive('oscillatorSnap', function () {
    return {
        templateUrl: 'views/oscillator-snap.html',
        restrict: 'E',
        scope: {
            componentInfo: '='
        }
    };
});