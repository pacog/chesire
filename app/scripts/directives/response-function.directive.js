'use strict';

angular.module('chesireApp')

.directive('responseFunction', function () {
    return {
        templateUrl: 'views/response-function.html',
        restrict: 'E',
        scope: {
            responseFunctionInfo: '='
        },
        controller: 'ResponseFunctionCtrl'
    };
});