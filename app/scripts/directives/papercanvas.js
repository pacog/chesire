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
            var canvas = element.find('canvas')[0];

            var resizeCanvas = function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                scope.canvasResized(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', resizeCanvas, false); //TODO: throttle this function
            resizeCanvas();
            scope.canvas = canvas;
            scope.init(canvas);
        }
    };
});
