'use strict';

angular.module('chesireApp')

.directive('scaleoptions', function () {
    return {
        templateUrl: 'scripts/scale-options/scale-options.html',
        restrict: 'E',
        scope: {},
        controller: 'ScaleoptionsCtrl'
    };
});