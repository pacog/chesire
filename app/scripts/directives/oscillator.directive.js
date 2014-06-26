'use strict';

angular.module('chesireApp')

.directive('oscillator', function () {
    return {
        templateUrl: 'views/oscillator.html',
        restrict: 'E',
        controller: 'OscillatorCtrl'
    };
});