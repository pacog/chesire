'use strict';

angular.module('chesireApp')

.directive('midigenerator', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/midi/midi-generator.html',
        scope: {},
        controller: 'MidigeneratorCtrl'
    };
});