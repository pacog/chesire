'use strict';

angular.module('chesireApp')

.directive('soundgenerator', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/sound-generator/sound-generator.html',
        scope: {},
        controller: 'SoundgeneratorCtrl'
    };
});
