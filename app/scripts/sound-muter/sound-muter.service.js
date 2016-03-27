(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('soundMuter', soundMuter);

    function soundMuter($timeout, hotKeys, Leapmotion) {
        var isSpacePressed;
        var noHands;
        var fistGesture;
        var MIN_GRAB_STRENGTH = 0.9;

        var factory = {
            init: init,
            isMuted: isMuted,
            getMuteType: getMuteType
        };

        return factory;

        function init() {
            noHands = true;
            isSpacePressed = false;
            fistGesture = false;
            hotKeys.on('TOGGLE_MUTE', toggleSpace);
            Leapmotion.subscribeToFrameChange(leapChanged);
        }

        function isMuted() {
            return isSpacePressed || noHands || fistGesture;
        }

        function toggleSpace() {
            isSpacePressed = !isSpacePressed;
        }

        function leapChanged(frameInfo) {
            if(frameInfo && frameInfo.frame) {
                var newNoHands = checkNumberOfHands(frameInfo.frame);
                var newFistgesture = checkFistGesture(frameInfo.frame);
                
                if((noHands !== newNoHands) || (fistGesture !== newFistgesture)) {
                    $timeout(function() { //To apply scope
                        noHands = newNoHands;
                        fistGesture = newFistgesture;
                    });
                }
            }
        }

        function checkNumberOfHands(frame) {
            if(!frame.hands || !frame.hands.length) {
                return true;
            } else {
                return false;
            }
        }

        function checkFistGesture(frame) {
            if(frame.hands.length > 0) {
                if(frame.hands[0].grabStrength >= MIN_GRAB_STRENGTH) {
                    return true;
                }
            }
            return false;
        }

        function getMuteType() {
            if(isSpacePressed) {
                return 'space';
            } else if(noHands) {
                return 'noHands';
            } else if(fistGesture) {
                return 'fist';
            }
            return false;
        }

    }

})();