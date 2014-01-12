'use strict';

angular.module('chesireApp')

.controller('MainCtrl', function ($scope, Leapmotion) {

    $scope.fingers = 0;
    $scope.iterations = 0;

    var controller = new Leapmotion.Controller();

    controller.on( 'deviceFrame' , function( frame ) {

        $scope.iterations++;
        $scope.fingers = frame.fingers.length;
        $scope.$apply();
    });

    controller.connect();
});
