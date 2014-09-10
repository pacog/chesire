'use strict';

angular.module('chesireApp')

.directive('gestureSelector', function () {

    return {
        templateUrl: 'scripts/synth-options/gesture-selector.html',
        restrict: 'E',
        controller: 'GestureSelectorCtrl',
        scope: {
            gestureObject: '='
        }
    };
});