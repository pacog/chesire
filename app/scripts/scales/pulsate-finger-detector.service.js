(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('pulsateFingerDetectorFactory', pulsateFingerDetectorFactory);

    var paramsPerFinger = {
        'default': {
            PULSATION_ON_THRESHOLD: -215,
            PULSATION_OFF_THRESHOLD: 250
        },
        'middleFinger': {
            PULSATION_ON_THRESHOLD: -215,
            PULSATION_OFF_THRESHOLD: 250
        },
        'indexFinger': {
            PULSATION_ON_THRESHOLD: -185,
            PULSATION_OFF_THRESHOLD: 225
        },
        'ringFinger': {
            PULSATION_ON_THRESHOLD: -185,
            PULSATION_OFF_THRESHOLD: 225
        },
        'pinky': {
            PULSATION_ON_THRESHOLD: -125,
            PULSATION_OFF_THRESHOLD: 125
        },
        'thumb': {
            PULSATION_ON_THRESHOLD: -150,
            PULSATION_OFF_THRESHOLD: 225
        }
    };

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
        this.params = paramsPerFinger[id] || paramsPerFinger['default'];
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
        var yVelocityIsEnough = (fingerInfo.yVelocity < this.params.PULSATION_ON_THRESHOLD);
        var otherVelocityIsNotHigh = Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.xVelocity) && Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.zVelocity);
        return yVelocityIsEnough && otherVelocityIsNotHigh;
    };

    PulsateFingerDetector.prototype._fingerIsGoingOff = function(fingerInfo) {
        var yVelocityIsEnough = (fingerInfo.yVelocity > this.params.PULSATION_OFF_THRESHOLD);
        var otherVelocityIsNotHigh = Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.xVelocity) && Math.abs(fingerInfo.yVelocity) > Math.abs(fingerInfo.zVelocity);
        return yVelocityIsEnough && otherVelocityIsNotHigh;
    };

})();