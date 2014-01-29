'use strict';

angular.module('chesireApp')

.service('Handthreemodeller', function Handthreemodeller(Three) {

    var HAND_X = 60,
        HAND_Y = 10,
        HAND_Z = 100,
        FINGER_X = 10,
        FINGER_Y = 10,
        FINGER_Z = 60;

    var createHand = function() {

        var skyboxGeometry = new Three.CubeGeometry(HAND_X, HAND_Y, HAND_Z);
        var skyboxMaterial = new Three.MeshLambertMaterial({
            color: (Math.random() * 0xffffff),
            side: Three.BackSide
        });
        return new Three.Mesh(skyboxGeometry, skyboxMaterial);
    };

    var updateHand = function(hand, handInfo) {

        var pos = handInfo.stabilizedPalmPosition;
        var origin = new Three.Vector3(pos[0], pos[1] - (HAND_Y/2), pos[2] - (HAND_Z/2));
        hand.position = origin;
        hand.rotation.x = -handInfo.direction[1];
        hand.rotation.y = handInfo.direction[0] + 0.1;
        hand.rotation.z = handInfo.palmNormal[0];
    };

    var createFinger = function() {

        var skyboxGeometry = new Three.CubeGeometry(FINGER_X, FINGER_Y, FINGER_Z);
        var skyboxMaterial = new Three.MeshLambertMaterial({
            color: (Math.random() * 0xffffff),
            side: Three.BackSide
        });
        return new Three.Mesh(skyboxGeometry, skyboxMaterial);
    };

    var updateFinger = function(finger, fingerInfo) {

        var pos = fingerInfo.stabilizedTipPosition;
        var origin = new Three.Vector3(pos[0] - (FINGER_X/2), pos[1] - (FINGER_Y/2), pos[2] - (FINGER_Z/2));
        finger.position = origin;
        finger.rotation.x = -fingerInfo.direction[1];
        finger.rotation.y = fingerInfo.direction[0];
    };

    return {
        createHand:     createHand,
        updateHand:     updateHand,
        createFinger:   createFinger,
        updateFinger:   updateFinger
    };
});
