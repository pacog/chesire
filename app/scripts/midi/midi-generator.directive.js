'use strict';

angular.module('chesireApp')

.directive('midigenerator', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/midigenerator.html',
        scope: {},
        controller: 'MidigeneratorCtrl'
    };
});