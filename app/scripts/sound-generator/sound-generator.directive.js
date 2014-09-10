'use strict';

angular.module('chesireApp')

.directive('soundgenerator', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/soundgenerator.html',
        scope: {},
        controller: 'SoundgeneratorCtrl'
    };
});
