(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('responseFunction', responseFunction);

    function responseFunction() {
        return {
            templateUrl: 'scripts/gesture-selector/response-function.html',
            restrict: 'E',
            scope: {
                responseFunctionInfo: '=',
                changeCallback: '&'
            },
            controller: 'ResponseFunctionController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();
