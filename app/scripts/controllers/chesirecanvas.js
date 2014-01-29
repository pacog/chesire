'use strict';

angular.module('chesireApp')

.controller('ChesirecanvasCtrl', function ($scope, $timeout, Three, Leapmotion, Handthreemodeller) {

    var fingers = {};
    var hands = {};

    var drawHands = function(handsFromFrame, scene) {

        var currentHands = {};
        for(var i=0; i<handsFromFrame.length; i++) {

            var handInfo = handsFromFrame[i];
            var hand = hands[handInfo.id]; //Get the already existing hand if there is any

            if(!hand) {
                hand = Handthreemodeller.createHand();
                hands[handInfo.id] = hand;
                scene.add(hand);
            }
            Handthreemodeller.updateHand(hand, handInfo);
            currentHands[handInfo.id] = true;
        }
        for (var handId in hands) {
            if (!currentHands[handId]) {
                scene.remove(hands[handId]);
                delete hands[handId];
            }
        }
    };
    
    var drawFingers = function(fingersFromFrame, scene) {

        var currentFingers = {};
        for(var i=0; i<fingersFromFrame.length; i++) {

            var fingerInfo = fingersFromFrame[i];
            var finger = fingers[fingerInfo.id]; //Get the already existing finger if there is any

            if(!finger) {
                finger = Handthreemodeller.createFinger();
                fingers[fingerInfo.id] = finger;
                scene.add(finger);
            }
            Handthreemodeller.updateFinger(finger, fingerInfo);

            currentFingers[fingerInfo.id] = true;
        }
        for (var fingerId in fingers) {
            if (!currentFingers[fingerId]) {
                scene.remove(fingers[fingerId]);
                delete fingers[fingerId];
            }
        }
    };

    var createScene = function(element) {

        element.addClass('chesirecanvas');
        var height = element[0].offsetHeight,
            width = element[0].offsetHeight;

        $scope.scene = new Three.Scene();
        //Camera...
        $scope.camera = new Three.PerspectiveCamera( 45, width / height, 0.1, 1000 );
        $scope.camera.position.z = 500;
        $scope.camera.position.y = 200;
        $scope.camera.lookAt(new Three.Vector3(0,200,0));
        //Lights...
        $scope.pointLight = new Three.PointLight(0xffffff);
        $scope.pointLight.position.set(0, 300, 200);
        $scope.pointLight2 = new Three.PointLight(0x33fff33);
        $scope.pointLight2.position.set(100, -200, -300);
        $scope.scene.add($scope.pointLight);
        $scope.scene.add($scope.pointLight2);
        //Action!
        $scope.renderer = new Three.WebGLRenderer();
        $scope.renderer.setSize( width, height );
        element.append($scope.renderer.domElement);
    };

    $scope.init = function(element) {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {
            createScene(element);
            $scope.frameInfo = Leapmotion.getFrameInfo();
            $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
            $scope.renderer.render($scope.scene, $scope.camera);
        });
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {

            drawHands(frame.hands, $scope.scene);
            drawFingers(frame.fingers, $scope.scene);
            $scope.renderer.render($scope.scene, $scope.camera);
        }
    };
});
