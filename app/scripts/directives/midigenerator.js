'use strict';

angular.module('chesireApp')

.directive('midigenerator', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/midigenerator.html',
        scope: {
            'synthoptions': '='
        },
        controller: 'MidigeneratorCtrl'
    };
});