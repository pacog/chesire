'use strict';

angular.module('chesireApp')

.directive('synthoptions', function () {
    return {
        templateUrl: 'scripts/synth-options/synth-options.html',
        restrict: 'E',
        scope: {},
        controller: 'SynthOptionsController',
        controllerAs: 'vm'
    };
});
