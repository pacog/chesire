'use strict';

angular.module('chesireApp')

.directive('oscillator', function () {
    return {
        templateUrl: 'scripts/oscillator/oscillator.html',
        restrict: 'E',
        controller: 'OscillatorCtrl'
    };
});