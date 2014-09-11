'use strict';

angular.module('chesireApp')

.directive('customCheckbox', function () {
    return {
        templateUrl: 'scripts/custom-checkbox/custom-checkbox.html',
        restrict: 'E',
        replace: true,
        scope: {
            'value': '='
        }
    };
});