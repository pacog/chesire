'use strict';

angular.module('chesireApp')

.service('Handthreemodeller', function Handthreemodeller(Three) {

    var createHand = function() {

        var skyboxGeometry = new Three.CubeGeometry(40, 10, 100);
        var skyboxMaterial = new Three.MeshLambertMaterial({
            color: (Math.random() * 0xffffff),
            side: Three.BackSide
        });
        return new Three.Mesh(skyboxGeometry, skyboxMaterial);
    };

    var updateHand = function(hand, handInfo) {

        var pos = handInfo.stabilizedPalmPosition;
        var origin = new Three.Vector3(pos[0], pos[1], pos[2]);
        hand.position = origin;
        hand.rotation.x = -handInfo.direction[1];
        hand.rotation.y = handInfo.direction[0];
        hand.rotation.z = handInfo.palmNormal[0];
    };

    var createFinger = function() {

        var skyboxGeometry = new Three.CubeGeometry(10, 10, 40);
        var skyboxMaterial = new Three.MeshLambertMaterial({
            color: (Math.random() * 0xffffff),
            side: Three.BackSide
        });
        return new Three.Mesh(skyboxGeometry, skyboxMaterial);
    };

    var updateFinger = function(finger, fingerInfo) {

        var pos = fingerInfo.stabilizedTipPosition;
        var origin = new Three.Vector3(pos[0], pos[1], pos[2]);
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
