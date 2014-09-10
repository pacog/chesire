'use strict';

angular.module('chesireApp')

.directive('responseFunction', function () {
    return {
        templateUrl: 'scripts/synth-options/response-function.html',
        restrict: 'E',
        scope: {
            responseFunctionInfo: '='
        },
        controller: 'ResponseFunctionCtrl'
    };
});