'use strict';

angular.module('chesireApp')

.directive('switchTwoValues', function () {

    return {
        templateUrl: 'views/switch-two-values.html',
        restrict: 'E',
        scope: {
            values: '=',
            bindModel:'=ngModel'
        },
        controller: 'SwitchTwoValuesCtrl'
    };
});