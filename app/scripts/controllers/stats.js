'use strict';

angular.module('chesireApp')

.controller('StatsCtrl', function ($scope, $timeout, Leapmotion, MotionParamsList) {


    $scope.motionParams = {};

    $scope.resetVars = function() {
        angular.forEach(MotionParamsList, function(param) {
            $scope.motionParams[param] = '';
        });
    };

    $scope.init = function() {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {

            $scope.stats = Leapmotion.getStats();
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
        });
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                $scope.motionParams = Leapmotion.getRelativePositions(frame, frame.hands);
            } else {
                $scope.resetVars();
            }
        }
    };
});
