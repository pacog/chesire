(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('switchTwoValues', switchTwoValues);

    function switchTwoValues() {
        return {
            templateUrl: 'scripts/switch-two-values/switch-two-values.html',
            restrict: 'E',
            scope: {
                values: '=',
                bindModel:'=ngModel',
                changeCallback: '&'
            },
            controller: 'SwitchTwoValuesController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();
