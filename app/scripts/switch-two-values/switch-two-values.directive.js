'use strict';

angular.module('chesireApp')

.directive('switchTwoValues', function () {

    return {
        templateUrl: 'scripts/switch-two-values/switch-two-values.html',
        restrict: 'E',
        scope: {
            values: '=',
            bindModel:'=ngModel'
        },
        controller: 'SwitchTwoValuesCtrl'
    };
});