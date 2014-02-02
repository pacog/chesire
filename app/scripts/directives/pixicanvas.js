'use strict';

angular.module('chesireApp')
.directive('pixicanvas', function () {

    return {
        restrict: 'E',
        controller: 'PixicanvasCtrl',
        templateUrl: 'views/pixicanvas.html',
        scope: {},
        link: function postLink(scope, element) {

            var canvas = element.find('div');
            scope.init(canvas);
        }
    };
});
