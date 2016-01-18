'use strict';

angular.module('chesireApp')

.directive('responseFunction', function () {
    return {
        templateUrl: 'scripts/gesture-selector/response-function.html',
        restrict: 'E',
        scope: {
            responseFunctionInfo: '='
        },
        controller: 'ResponseFunctionCtrl'
    };
});
