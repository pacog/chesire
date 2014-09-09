'use strict';

angular.module('chesireApp')

.controller('GestureSelectorCtrl', function ($scope, MotionParamsList, ResponseFunctions) {

    var init = function() {
        $scope.availableGestures = MotionParamsList;
        $scope.availableResponseFunctions = ResponseFunctions;
    };

    $scope.toggleGestureList = function() {
        $scope.gestureListExpanded = !$scope.gestureListExpanded;
    };

    $scope.selectGesture = function(newGesture) {
        $scope.gestureListExpanded = false;
        $scope.gestureObject.param = newGesture;
    };

    $scope.toggleResponseFunctionList = function() {
        $scope.responseFunctionListExpanded = !$scope.responseFunctionListExpanded;
    };

    $scope.selectResponseFunction = function(newResponseFunction) {
        $scope.responseFunctionListExpanded = false;
        $scope.gestureObject.responseFunction.name = newResponseFunction.name;
    };

    init();
});