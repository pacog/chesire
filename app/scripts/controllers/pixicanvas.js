'use strict';

angular.module('chesireApp')

.controller('PixicanvasCtrl', function ($scope, $timeout, Leapmotion, Pixi) {

    var createScene = function(element) {

        var stage = new Pixi.Stage(0xEEFFFF);
        var renderer = Pixi.autoDetectRenderer(element[0].clientWidth, element[0].clientHeight);
        element[0].appendChild(renderer.view);
        renderer.render(stage);
    };

    $scope.frameInfoChanged = function() {

    };

    $scope.init = function(element) {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
        });
    };
});
