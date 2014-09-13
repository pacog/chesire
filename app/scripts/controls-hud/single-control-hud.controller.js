'use strict';

angular.module('chesireApp')

.controller('SingleControlHudCtrl', function ($scope, Leapmotion, MotionParamsHelper) {

    var init = function() {
        Leapmotion.subscribeToFrameChange(updateOutput);
    };

    var updateOutput = function(frame) {
        var frameInfo = frame.frame;
        if(frameInfo && !_.isEmpty(frameInfo.hands)) {
            var motionParams = Leapmotion.getRelativePositions(frameInfo, frameInfo.hands);
            $scope.outputValue = Math.round(100*MotionParamsHelper.getParamValue($scope.controlInfo, motionParams));
        }
    };

    init();
});