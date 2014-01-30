'use strict';

angular.module('chesireApp')
.directive('papercanvas', function () {

    return {
        restrict: 'E',
        controller: 'PapercanvasCtrl',
        templateUrl: 'views/papercanvas.html',
        scope: {
            'chesirescale': '='
        },
        link: function postLink(scope, element) {
            var canvas = element.find('canvas');

            var resizeCanvas = function() {
                canvas[0].width = window.innerWidth;
                canvas[0].height = window.innerHeight;
                scope.canvasResized(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', resizeCanvas, false); //TODO: throttle this function
            resizeCanvas();
            scope.canvas = canvas;
            scope.init(canvas);
        }
    };
});
