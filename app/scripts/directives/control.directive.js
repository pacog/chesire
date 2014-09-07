'use strict';

angular.module('chesireApp')

.directive('control', function () {
    return {
        templateUrl: 'views/control.html',
        restrict: 'E',
        scope: {
            controlInfo: '='
        },
        controller: 'ControlCtrl'
    };
});