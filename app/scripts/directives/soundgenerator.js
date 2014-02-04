'use strict';

angular.module('chesireApp')

.directive('soundgenerator', function () {
    return {
        templateUrl: 'views/soundgenerator.html',
        restrict: 'E',
        scope: {
            'synthoptions': '=',
            'chesirescale': '='
        },
        controller: 'SoundgeneratorCtrl'
    };
});
