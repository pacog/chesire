'use strict';

angular.module('chesireApp')

.service('Leapmotion', function Leapmotion($rootScope) {

    var leapInfo = {
        fingers: 0,
        hands: 0,
        iterations: 0,
        connected: false
    };

    var handsInfo = {
        hands: [],
        interactionBox: false,
        id: 1   //id that will be updated to make angular notice it changed
    };

    var init = function() {

        /* global Leap */
        if(!Leap) {
            throw 'Error, LeapMotion library was not loaded';
        }

        var controller = new Leap.Controller();

        controller.on('deviceFrame', deviceFrameHandler);
        controller.on('connect', connectHandler);
        controller.on('deviceConnected', deviceConnectedHandler);
        controller.on('deviceDisconnected', deviceDisconnectedHandler);

        controller.connect();

        return Leap;
    };

    var deviceFrameHandler = function(frame) {

        leapInfo.iterations++;
        leapInfo.fingers = frame.fingers.length;
        leapInfo.hands = frame.hands.length;
        updateHandsInfo(frame);
        $rootScope.$apply();
    };

    var updateHandsInfo = function(frame) {

        handsInfo.id = frame.id;
        handsInfo.hands = frame.hands;
        handsInfo.interactionBox = frame.interactionBox;
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

    var getHands = function() {

        return handsInfo;
    };

    var leapObject = init();

    return {

        leapObject: leapObject,
        getStats:   getStats,
        getHands:   getHands
    };
});
