'use strict';

angular.module('chesireApp')

.directive('responseFunctionParam', function () {
    return {
        templateUrl: 'scripts/gesture-selector/response-function-param.html',
        restrict: 'E',
        scope: {
            paramParentObject: '=',
            paramKey: '=',
            paramInfo: '='
        },
        controller: 'ResponseFunctionParamCtrl'
    };
});
