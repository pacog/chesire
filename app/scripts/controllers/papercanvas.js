'use strict';

angular.module('chesireApp')


.controller('PapercanvasCtrl', function ($scope, $timeout, Paper, $document, Leapmotion, requestanimationframe) {

    var pointer;

    $scope.init = function(canvas) {

        //Timeout to make sure DOM is created for the directive
        $document.ready(function () {

            Paper.setup(canvas);

            $scope.$watch('chesirescale', $scope.scaleChanged);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);

            $scope.redraw();

        });
    };

    $scope.redraw = function() {
        Paper.view.draw();
        requestanimationframe($scope.redraw);
    };

    $scope.scaleChanged = function(newScale) {

        if(newScale) {
            
        }
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                $scope.updatePointerPosition(relativePositions);
            } else {
                $scope.updatePointerPosition(false);
            }
        }
    };

    $scope.updatePointerPosition = function(position) {

        if(position) {

            var x = position.x * $scope.windowWidth;
            var y = $scope.windowHeight - (position.y * $scope.windowHeight);

            if(!pointer) {
                pointer = new Paper.Path.Circle(new Paper.Point(x, y), 20);
                pointer.fillColor = 'black';
            } else {
                pointer.position = new Paper.Point(x, y);
            }
        } else {
            if(pointer) {
                pointer.remove();
                pointer = false;
            }
        }
    };

    $scope.canvasResized = function(newWidth, newHeight) {

        $scope.windowWidth = newWidth;
        $scope.windowHeight = newHeight;
        console.log('canvas resized');
    };
});
