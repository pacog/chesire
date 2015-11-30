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
    var FINGER_MIN_VELOCITY = 150;
    var FINGER_MAX_VELOCITY = 1000;
    var PALM_DIRECTION_X_MIN = 0;
    var PALM_DIRECTION_X_MAX = 0.5;
    var PALM_DIRECTION_Y_MIN = -0.3;
    var PALM_DIRECTION_Y_MAX = 0.5;
    var PALM_DIRECTION_Z_MIN = -0.5;
    var PALM_DIRECTION_Z_MAX = -1;
    var HAND_APERTURE_MIN = 0.45;
    var HAND_APERTURE_MAX = 2.60;
    var FINGER_DIRECTION_Y_MIN = -0.90;
    var FINGER_DIRECTION_Y_MAX = 0;
    var subscribersToFrameChange = [];
    var subscribersToFrameDeviceChange = [];

    var SOFTENED_ARRAY_SIZE = 5;

    var prevHandApertures = null;

    var init = function() {

        /* global Leap */
        if(!Leap) {
            throw 'Error, LeapMotion library was not loaded';
        }

        var controller = new Leap.Controller();

        controller.on('animationFrame', animationFrameHandler);
        controller.on('deviceFrame', deviceFrameHandler);
        controller.on('connect', connectHandler);
        controller.on('deviceStreaming/deviceStreaming', deviceConnectedHandler);
        controller.on('deviceStreaming/deviceStopped', deviceDisconnectedHandler);

        controller.connect();

        return Leap;
    };

    var animationFrameHandler = function(frame) {

        $rootScope.$apply(function() {
            leapInfo.iterations++;
            leapInfo.fingers = frame.fingers.length;
            leapInfo.hands = frame.hands.length;
            frameInfo.frame = frame;
            frameInfo.id = frame.id;
            notifySubscribersToFrameChange(frameInfo);
        });
    };

    var deviceFrameHandler = function(frame) {
        var info = {};
        $rootScope.$apply(function() {
            info.fingers = frame.fingers.length;
            info.hands = frame.hands.length;
            info.frame = frame;
            info.id = frame.id;
            notifySubscribersToDeviceFrameChange(info);
        });
    };

    var notifySubscribersToFrameChange = function(newFrameInfo) {

        angular.forEach(subscribersToFrameChange, function(subscriberCallback) {
            subscriberCallback(newFrameInfo);
        });
    };

    var notifySubscribersToDeviceFrameChange = function(newFrameInfo) {
        angular.forEach(subscribersToFrameDeviceChange, function(subscriberCallback) {
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
        var result = getRelativePositionXYZ(position, frame);

        var palmVelocityInfo = hands[0].palmVelocity;
        var palmVelocity = Math.sqrt(palmVelocityInfo[0] * palmVelocityInfo[0] + palmVelocityInfo[1] * palmVelocityInfo[1] + palmVelocityInfo[2] * palmVelocityInfo[2]);
        result.handVelocity = normalizeNumber((palmVelocity - PALM_MIN_VELOCITY)/(PALM_MAX_VELOCITY - PALM_MIN_VELOCITY));

        result.handDirectionX = normalizeNumber((hands[0].direction[0] - PALM_DIRECTION_X_MIN)/(PALM_DIRECTION_X_MAX - PALM_DIRECTION_X_MIN));
        result.handDirectionY = getHandDirectionY(hands[0]);
        result.handDirectionZ = normalizeNumber((hands[0].direction[2] - PALM_DIRECTION_Z_MIN)/(PALM_DIRECTION_Z_MAX - PALM_DIRECTION_Z_MIN));

        result.fingerVelocity = getFingersVelocity(hands[0]);
        result.handAperture = getHandAperture(hands[0]);
        result.fingerDirectionY = getFingerDirectionY(hands[0]);

        result.fingersPulsationInfo = getFingersPulsationInfo(hands[0]);
        result.fingersDirectionInfo = getFingersDirectionInfo(hands[0]);

        return result;
    };

    var getFingersPulsationInfo = function(hand) {
        var result = {
            pinky: getFingerPulsationInfo(hand.pinky, hand),
            indexFinger: getFingerPulsationInfo(hand.indexFinger, hand),
            middleFinger: getFingerPulsationInfo(hand.middleFinger, hand),
            thumb: getFingerPulsationInfo(hand.thumb, hand),
            ringFinger: getFingerPulsationInfo(hand.ringFinger, hand)
        };

        return result;
    };

    var getFingersDirectionInfo = function(hand) {
        var result = {
            pinky: getFingerDirectionInfo(hand.pinky, hand),
            indexFinger: getFingerDirectionInfo(hand.indexFinger, hand),
            middleFinger: getFingerDirectionInfo(hand.middleFinger, hand),
            thumb: getFingerDirectionInfo(hand.thumb, hand),
            ringFinger: getFingerDirectionInfo(hand.ringFinger, hand)
        };

        return result;

    };

    var getFingerDirectionInfo = function(finger) {
        return {
            xDirection: finger.direction[0],
            yDirection: finger.direction[1],
            zDirection: finger.direction[2]
        };
    };

    var getFingerPulsationInfo = function(finger) {
        return {
            xVelocity: finger.tipVelocity[0],
            yVelocity: finger.tipVelocity[1],
            zVelocity: finger.tipVelocity[2]
        };
    };

    var getRelativePositionXYZ = function(position, frame) {
        var result = {};

        result.x = normalizeNumber((position[0] - (frame.interactionBox.center[0] - (frame.interactionBox.size[0]/2)))/frame.interactionBox.size[0]);
        result.y = normalizeNumber((position[1] - (frame.interactionBox.center[1] - (frame.interactionBox.size[1]/2)))/frame.interactionBox.size[1]);
        result.z = normalizeNumber((position[2] - (frame.interactionBox.center[2] - (frame.interactionBox.size[2]/2)))/frame.interactionBox.size[2]);

        return result;
    };

    var getHandAperture = function(handInfo) {

        var result = 0;
        if(handInfo.fingers.length >2) {
            for(var i=0; i<handInfo.fingers.length; i++) {
                for(var j=0; j<handInfo.fingers.length; j++) {
                    if(i!==j) {
                        result += getAngleBetweenFingers(handInfo.fingers[i], handInfo.fingers[j]);
                    }
                }
            }
            result = result/handInfo.fingers.length;
            result = normalizeNumber((result - HAND_APERTURE_MIN)/(HAND_APERTURE_MAX - HAND_APERTURE_MIN));
        }

        return getSoftenedResult(result);
    };

    var getFingerDirectionY = function(handInfo) {
        if(handInfo.fingers.length) {
            var result = 0;
            var fingersMeasured = 0;
            for(var i=0; i<handInfo.fingers.length; i++) {
                if(handInfo.fingers[i].type !== 0) {    //No thumb
                    result += handInfo.fingers[i].direction[1];
                    fingersMeasured++;
                }
            }
            if(fingersMeasured) {
                result = result/fingersMeasured;
                return 1 - normalizeNumber((result - FINGER_DIRECTION_Y_MIN)/(FINGER_DIRECTION_Y_MAX - FINGER_DIRECTION_Y_MIN));
            }
        }
        //If there ais not enough finger info
        return getHandDirectionY();
    };

    var getHandDirectionY = function(handInfo) {
        return 1 - normalizeNumber((handInfo.direction[1] - PALM_DIRECTION_Y_MIN)/(PALM_DIRECTION_Y_MAX - PALM_DIRECTION_Y_MIN));
    };

    var getSoftenedResult = function(newValue) {
        prevHandApertures = prevHandApertures || Array.apply(null, new Array(SOFTENED_ARRAY_SIZE)).map(Number.prototype.valueOf,0);
        prevHandApertures.pop();
        prevHandApertures.splice(0, 0, newValue);
        var total = 0;
        for(var i=0; i<SOFTENED_ARRAY_SIZE; i++) {
            total += prevHandApertures[i];
        }
        return total/SOFTENED_ARRAY_SIZE;
    };

    var getAngleBetweenFingers = function(finger1, finger2) {
        var product1 = finger1.direction[0]*finger2.direction[0]/* + finger1.direction[1]*finger2.direction[1]*/ +finger1.direction[2]*finger2.direction[2];
        var denom1 = Math.sqrt(finger1.direction[0]*finger1.direction[0]/* + finger1.direction[1]*finger1.direction[1]*/ + finger1.direction[2]*finger1.direction[2]);
        var denom2 = Math.sqrt(finger2.direction[0]*finger2.direction[0]/* + finger2.direction[1]*finger2.direction[1]*/ + finger2.direction[2]*finger2.direction[2]);
        var cos = product1/(denom1*denom2);

        return Math.abs(Math.acos(cos));
    };

    var getFingersVelocity = function(handInfo) {

        if(handInfo.fingers.length) {

            var totalVelocity = 0;

            for(var i=0; i< handInfo.fingers.length; i++) {
                totalVelocity += getFingerVelocity(handInfo.fingers[i], handInfo);
            }
            return normalizeNumber((totalVelocity - FINGER_MIN_VELOCITY)/(FINGER_MAX_VELOCITY - FINGER_MIN_VELOCITY));
        }
        return 0;
    };

    var getFingerVelocity = function(finger, hand) {
        var velX = finger.tipVelocity[0] - hand.palmVelocity[0];
        var velY = finger.tipVelocity[1] - hand.palmVelocity[1];
        var velZ = finger.tipVelocity[2] - hand.palmVelocity[2];

        return Math.sqrt(velX*velX + velY*velY + velZ*velZ);
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

    var subscribeToFrameDeviceChange = function(callback) {
        subscribersToFrameDeviceChange.push(callback);
    };

    var unsubscribeToFrameDeviceChange = function(callback) {
        subscribersToFrameDeviceChange = _.without(subscribersToFrameDeviceChange, callback);
    };

    var leapObject = init();

    return {

        leapObject:             leapObject,
        getStats:               getStats,
        getFrameInfo:           getFrameInfo,
        getRelativePositions:   getRelativePositions,
        subscribeToFrameChange: subscribeToFrameChange,
        getRelativePositionXYZ: getRelativePositionXYZ,
        subscribeToFrameDeviceChange: subscribeToFrameDeviceChange,
        unsubscribeToFrameDeviceChange: unsubscribeToFrameDeviceChange
    };
});
