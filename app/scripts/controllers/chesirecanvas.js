'use strict';

angular.module('chesireApp')

.controller('ChesirecanvasCtrl', function ($scope, $timeout, Three, Leapmotion) {

    $scope.init = function(element) {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {

            element.addClass('chesirecanvas');
            var height = element[0].offsetHeight,
                width = element[0].offsetHeight;

            $scope.scene = new Three.Scene();
            $scope.camera = new Three.PerspectiveCamera( 75, width / height, 0.1, 1000 );
            $scope.renderer = new Three.WebGLRenderer();
            $scope.renderer.setSize( width, height );
            element.append($scope.renderer.domElement);

            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
        });
    };

    $scope.frameInfoChanged = function() {

        //TODO
    };
});
