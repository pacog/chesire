'use strict';

angular.module('chesireApp')

.directive('threeparticles', function () {

    return {
        restrict: 'E',
        controller: 'ThreeparticlesCtrl',
        scope: {},
        link: function postLink(scope, element) {

            scope.init(element);
        }
    };
});
