(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('customCheckbox', customCheckbox);

    function customCheckbox() {
        return {
            templateUrl: 'scripts/custom-checkbox/custom-checkbox.html',
            restrict: 'E',
            replace: true,
            scope: {
                'value': '=',
                'changeCallback': '&'
            }
        };
    }
})();
