'use strict';

angular.module('chesireApp')

.controller('PixicanvasCtrl', function ($scope, $timeout, Leapmotion, Pixi, requestanimationframe) {

    var pointer = null;
    var stage = null;
    var renderer = null;

    var createScene = function(element) {

        stage = new Pixi.Stage(0xEEFFFF);
        $scope.windowWidth = element[0].clientWidth;
        $scope.windowHeight = element[0].clientHeight;
        renderer = Pixi.autoDetectRenderer($scope.windowWidth, $scope.windowHeight, null, false, true);
        element[0].appendChild(renderer.view);
        pointer = new Pixi.Graphics();
        pointer.lineStyle ( 2 , 0x000000,  1);
        pointer.beginFill(0x00DD00);
        pointer.drawCircle(0, 0, 15);
        stage.addChild(pointer);
    };

    $scope.init = function(element) {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
            requestanimationframe( $scope.eachFrame );
        });
    };

    $scope.eachFrame = function() {
        renderer.render(stage);
        requestanimationframe( $scope.eachFrame );
    };

    //TODO: this should be from another directive
    $scope.getPixelsPosition = function(relativePosition) {
        return {
            x: relativePosition.x * $scope.windowWidth,
            y: $scope.windowHeight - (relativePosition.y * $scope.windowHeight)
        };
    };

    $scope.frameInfoChanged = function() {
        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                var pixelPosition = $scope.getPixelsPosition(relativePositions);
                $scope.updatePointerPosition(pixelPosition);
                //$scope.updateParticles(pixelPosition);
            } else {
                $scope.updatePointerPosition(false);
            }
        }
    };

    $scope.updatePointerPosition = function(position) {
        
        if(position) {
            pointer.position.x = position.x;
            pointer.position.y = position.y;
        }
    };
});
