'use strict';

angular.module('chesireApp')

.directive('synthoptions', function () {
    return {
        templateUrl: 'views/synthoptions.html',
        restrict: 'E',
        scope: {},
        controller: 'SynthoptionsCtrl'
    };
});
