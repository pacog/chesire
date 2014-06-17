'use strict';

angular.module('chesireApp')

.directive('scaleoptions', function () {
    return {
        templateUrl: 'views/scaleoptions.html',
        restrict: 'E',
        scope: {},
        controller: 'ScaleoptionsCtrl'
    };
});