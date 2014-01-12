'use strict';

angular.module('chesireApp')

.directive('chesirecanvas', function () {

    return {
        restrict: 'E',
        controller: 'ChesirecanvasCtrl',
        scope: {},
        link: function postLink(scope, element) {

            scope.init(element);
        }
    };
});
