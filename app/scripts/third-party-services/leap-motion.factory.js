'use strict';

angular.module('chesireApp')

.factory('Leapmotion', function Leapmotion($rootScope) {

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

    var PALM_MIN_VELOCITY = 50;
    var PALM_MAX_VELOCITY = 500;
    var PALM_DIRECTION_X_MIN = 0;
    var PALM_DIRECTION_X_MAX = 0.5;
    var PALM_DIRECTION_Y_MIN = -0.3;
    var PALM_DIRECTION_Y_MAX = 0.5;
    var PALM_DIRECTION_Z_MIN = -0.5;
    var PALM_DIRECTION_Z_MAX = -1;

    var subscribersToFrameChange = [];

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
            notifySubscribersToFrameChange(frameInfo);
        });
    };

    var notifySubscribersToFrameChange = function(newFrameInfo) {

        angular.forEach(subscribersToFrameChange, function(subscriberCallback) {
            subscriberCallback(newFrameInfo);
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

        var palmVelocityInfo = hands[0].palmVelocity;
        var palmVelocity = Math.sqrt(palmVelocityInfo[0] * palmVelocityInfo[0] + palmVelocityInfo[1] * palmVelocityInfo[1] + palmVelocityInfo[2] * palmVelocityInfo[2]);
        result.handVelocity = normalizeNumber((palmVelocity - PALM_MIN_VELOCITY)/(PALM_MAX_VELOCITY - PALM_MIN_VELOCITY));

        result.handDirectionX = normalizeNumber((hands[0].direction[0] - PALM_DIRECTION_X_MIN)/(PALM_DIRECTION_X_MAX - PALM_DIRECTION_X_MIN));
        result.handDirectionY = normalizeNumber((hands[0].direction[1] - PALM_DIRECTION_Y_MIN)/(PALM_DIRECTION_Y_MAX - PALM_DIRECTION_Y_MIN));
        result.handDirectionZ = normalizeNumber((hands[0].direction[2] - PALM_DIRECTION_Z_MIN)/(PALM_DIRECTION_Z_MAX - PALM_DIRECTION_Z_MIN));

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

    var subscribeToFrameChange = function(callback) {

        subscribersToFrameChange.push(callback);
    };

    var leapObject = init();

    return {

        leapObject:             leapObject,
        getStats:               getStats,
        getFrameInfo:           getFrameInfo,
        getRelativePositions:   getRelativePositions,
        subscribeToFrameChange: subscribeToFrameChange
    };
});
