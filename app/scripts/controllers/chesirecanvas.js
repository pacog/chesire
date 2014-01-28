'use strict';

angular.module('chesireApp')

.controller('ChesirecanvasCtrl', function ($scope, $timeout, Three, Leapmotion) {

    // var fingers = {};
    var hands = {};

    $scope.init = function(element) {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {

            element.addClass('chesirecanvas');
            var height = element[0].offsetHeight,
                width = element[0].offsetHeight;

            $scope.scene = new Three.Scene();
            $scope.camera = new Three.PerspectiveCamera( 45, width / height, 0.1, 1000 );
            $scope.renderer = new Three.WebGLRenderer();
            $scope.renderer.setSize( width, height );
            element.append($scope.renderer.domElement);

            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);

            $scope.camera.position.z = 500;
            $scope.camera.position.y = 200;
            $scope.camera.lookAt(new Three.Vector3(0,200,0));

            $scope.renderer.render($scope.scene, $scope.camera);
        });
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {

            var currentHands = {};
            for(var i=0; i<frame.hands.length; i++) {

                var handInfo = frame.hands[i];
                var hand = hands[handInfo.id]; //Get the already existiung hand if there is any
                var pos = handInfo.palmPosition;
                var dir = handInfo.direction;
                var origin = new Three.Vector3(pos[0], pos[1], pos[2]);
                var direction = new Three.Vector3(dir[0], dir[1], dir[2]);
                if(!hand) {
                    hand = new Three.ArrowHelper(origin, direction, 40, Math.random() * 0xffffff);
                    hands[handInfo.id] = hand;
                    $scope.scene.add(hand);
                }
                hand.position = origin;
                hand.setDirection(direction);

                currentHands[handInfo.id] = true;
            }
            for (var handId in hands) {
                if (!currentHands[handId]) {
                    $scope.scene.remove(hands[handId]);
                    delete hands[handId];
                }
            }
            $scope.renderer.render($scope.scene, $scope.camera);
        }
    };
});
