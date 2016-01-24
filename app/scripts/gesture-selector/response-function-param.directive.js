(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('responseFunctionParam', responseFunctionParam);

    function responseFunctionParam() {
        return {
            templateUrl: 'scripts/gesture-selector/response-function-param.html',
            restrict: 'E',
            scope: {
                paramParentObject: '=',
                paramKey: '=',
                paramInfo: '=',
                changeCallback: '&'
            },
            controller: 'ResponseFunctionParamController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();


