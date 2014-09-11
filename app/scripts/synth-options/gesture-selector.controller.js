'use strict';

angular.module('chesireApp')

.controller('GestureSelectorCtrl', function ($scope, MotionParamsList) {

    var init = function() {
        $scope.availableGestures = MotionParamsList;
    };

    init();
});