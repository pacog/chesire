(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('pulsateFingerDetectorFactory', pulsateFingerDetectorFactory);

    var PULSATION_ON_THRESHOLD = -300;
    var PULSATION_OFF_THRESHOLD = 400;

    function pulsateFingerDetectorFactory() {
        

        var factory = {
            getDetector: getDetector
        };
        return factory;

        function getDetector(id) {
            return new PulsateFingerDetector(id);
        }
    }

    function PulsateFingerDetector(id) {
        this.init(id);
    }

    PulsateFingerDetector.prototype.init = function(id) {
        this.id = id;
        this.reset();
    };

    PulsateFingerDetector.prototype.reset = function() {
        this.pulsating = false;
    };

    PulsateFingerDetector.prototype.updateAndGetStatus = function(fingerInfo) {
        var isNewPulse = false;
        if(this._velocityYIsPulsating(fingerInfo)) { //TODO check in a better way, have some throttling or detect changes in speed that are relevant
            isNewPulse = true;
            this.pulsating = true;
        } else if(this._fingerIsGoingOff(fingerInfo)) {
            this.pulsating = false;
            //TODO we can add the finger going off info here
        }

        return {
            justStartedPulsating: isNewPulse,
            isPulsating: this.pulsating
        };
    };

    PulsateFingerDetector.prototype._velocityYIsPulsating = function(fingerInfo) {
        var yVelocityIsEnough = (fingerInfo.yVelocity < PULSATION_ON_THRESHOLD);
        var otherVelocityIsNotHigh = Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.xVelocity) && Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.zVelocity);
        return yVelocityIsEnough && otherVelocityIsNotHigh;
    };

    PulsateFingerDetector.prototype._fingerIsGoingOff = function(fingerInfo) {
        var yVelocityIsEnough = (fingerInfo.yVelocity > PULSATION_OFF_THRESHOLD);
        var otherVelocityIsNotHigh = Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.xVelocity) && Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.zVelocity);
        return yVelocityIsEnough && otherVelocityIsNotHigh;
    };

})();