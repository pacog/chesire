'use strict';

angular.module('chesireApp')

.service('Leapmotion', function Leapmotion($rootScope) {

    var leapInfo = {
        finger: 0,
        iterations: 0,
        connected: false
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
        $rootScope.$apply();
    };

    var connectHandler = function() {

        leapInfo.connected = true;
    };

    var deviceConnectedHandler = function() {

        leapInfo.connected = true;
    };

    var deviceDisconnectedHandler = function() {

        leapInfo.connected = false;
    };

    var getStats = function() {

        return leapInfo;
    };

    var leapObject = init();

    return {

        leapObject: leapObject,
        getStats: getStats
    };
});
