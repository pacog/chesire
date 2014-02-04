'use strict';

angular.module('chesireApp')

.directive('threeparticles', function () {

    return {
        restrict: 'E',
        controller: 'ThreeparticlesCtrl',
        scope: {
            'chesirescale': '='
        },
        link: function postLink(scope, element) {

            scope.init(element);
        }
    };
});
