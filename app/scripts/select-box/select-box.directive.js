'use strict';

angular.module('chesireApp')

.directive('selectBox', function () {
    return {
        templateUrl: 'scripts/select-box/select-box.html',
        restrict: 'E',
        scope: {
            value: '=',
            valueList: '='
        },
        controller: 'SelectBoxCtrl'
    };
});