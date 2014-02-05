'use strict';

angular.module('chesireApp')

.service('Leapmotion', function Leapmotion($rootScope) {

    var leapInfo = {
        fingers: 0,
        hands: 0,
        iterations: 0,
        connected: false
    };

    var frameInfo = {
        id: false,
        frame: null
    };

    var init = function() {

        /* global Leap */
        if(!Leap) {
            throw 'Error, LeapMotion library was not loaded';
        }

        var controller = new Leap.Controller();

        controller.on('animationFrame', deviceFrameHandler);
        controller.on('connect', connectHandler);
        controller.on('deviceConnected', deviceConnectedHandler);
        controller.on('deviceDisconnected', deviceDisconnectedHandler);

        controller.connect();

        return Leap;
    };

    var deviceFrameHandler = function(frame) {

        $rootScope.$apply(function() {
            leapInfo.iterations++;
            leapInfo.fingers = frame.fingers.length;
            leapInfo.hands = frame.hands.length;
            frameInfo.frame = frame;
            frameInfo.id = frame.id;
        });
    };

    var connectHandler = function() {

        leapInfo.connected = true;
        $rootScope.$apply();
    };

    var deviceConnectedHandler = function() {

        leapInfo.connected = true;
        $rootScope.$apply();
    };

    var deviceDisconnectedHandler = function() {

        leapInfo.connected = false;
        $rootScope.$apply();
    };

    var getStats = function() {

        return leapInfo;
    };

    var getFrameInfo = function() {

        return frameInfo;
    };

    var getRelativePositions = function(frame, hands) {

        // var position = hands[0].stabilizedPalmPosition;
        var position = hands[0].palmPosition;
        var result = {};
        result.x = normalizeNumber((position[0] - (frame.interactionBox.center[0] - (frame.interactionBox.size[0]/2)))/frame.interactionBox.size[0]);
        result.y = normalizeNumber((position[1] - (frame.interactionBox.center[1] - (frame.interactionBox.size[1]/2)))/frame.interactionBox.size[1]);
        result.z = normalizeNumber((position[2] - (frame.interactionBox.center[2] - (frame.interactionBox.size[2]/2)))/frame.interactionBox.size[2]);

        return result;
    };

    var normalizeNumber = function(number) {

        if(number < 0) {
            return 0;
        }
        if(number > 1) {
            return 1;
        }
        return number;
    };

    var leapObject = init();

    return {

        leapObject:             leapObject,
        getStats:               getStats,
        getFrameInfo:           getFrameInfo,
        getRelativePositions:   getRelativePositions
    };
});
