'use strict';

angular.module('chesireApp')

.directive('chesirecanvas', function () {

    return {
        templateUrl: 'views/chesirecanvas.html',
        restrict: 'E',
        controller: 'ChesirecanvasCtrl',
        link: function postLink(scope, element) {

            scope.init(element);
        }
    };
});
