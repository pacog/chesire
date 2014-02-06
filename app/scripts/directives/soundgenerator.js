'use strict';

angular.module('chesireApp')

.directive('soundgenerator', function () {
    return {
        restrict: 'E',
        scope: {
            'synthoptions': '=',
            'chesirescale': '=',
            'currentsound': '='
        },
        controller: 'SoundgeneratorCtrl'
    };
});
