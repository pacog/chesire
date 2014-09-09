'use strict';

angular.module('chesireApp')

.directive('gestureSelector', function () {

    return {
        templateUrl: 'views/gesture-selector.html',
        restrict: 'E',
        controller: 'GestureSelectorCtrl',
        scope: {
            gestureObject: '='
        }
    };
});