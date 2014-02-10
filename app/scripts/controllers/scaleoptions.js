'use strict';

angular.module('chesireApp')

.controller('ScaleoptionsCtrl', function ($scope, DefaultScale) {

    $scope.init = function() {
        $scope.chesirescale = {
            currentScale: DefaultScale
        };
    };
    $scope.init();
 });