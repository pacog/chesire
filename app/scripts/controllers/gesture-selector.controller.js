'use strict';

angular.module('chesireApp')

.controller('GestureSelectorCtrl', function ($scope, MotionParamsList) {

    var init = function() {
        $scope.availableGestures = MotionParamsList;
    };

    $scope.toggleGestureList = function() {
        $scope.gestureListExpanded = !$scope.gestureListExpanded;
    };

    $scope.selectGesture = function(newGesture) {
        $scope.gestureListExpanded = false;
        $scope.gestureObject.param = newGesture;
    };

    init();
});