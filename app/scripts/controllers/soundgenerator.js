'use strict';

angular.module('chesireApp')

.controller('SoundgeneratorCtrl', function ($scope, Leapmotion) {

    $scope.resetVars = function() {
        $scope.x = '-';
        $scope.y = '-';
        $scope.z = '-';
    };

    $scope.init = function() {
        $scope.frameInfo = Leapmotion.getFrameInfo();
        $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
        $scope.resetVars();
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                $scope.x = relativePositions.x;
                $scope.y = relativePositions.y;
                $scope.z = relativePositions.z;

            } else {
                $scope.resetVars();
            }
        }
    };

    $scope.init();
 });
