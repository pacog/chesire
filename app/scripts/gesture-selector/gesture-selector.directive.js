'use strict';

angular.module('chesireApp')

.directive('gestureSelector', function () {

    return {
        templateUrl: 'scripts/gesture-selector/gesture-selector.html',
        restrict: 'E',
        controller: 'GestureSelectorCtrl',
        scope: {
            gestureObject: '='
        }
    };
});
