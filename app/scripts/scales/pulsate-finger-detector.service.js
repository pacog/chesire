(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('pulsateFingerDetectorFactory', pulsateFingerDetectorFactory);

    var HISTORY_SIZE = 40;
    var paramsPerFinger = {
        'default': {
            PULSATION_ON_THRESHOLD: -100,
            PULSATION_OFF_THRESHOLD: 250
        }
        // ,
        // 'middleFinger': {
        //     PULSATION_ON_THRESHOLD: -55,
        //     PULSATION_OFF_THRESHOLD: 250
        // },
        // 'indexFinger': {
        //     PULSATION_ON_THRESHOLD: -55,
        //     PULSATION_OFF_THRESHOLD: 225
        // },
        // 'ringFinger': {
        //     PULSATION_ON_THRESHOLD: -55,
        //     PULSATION_OFF_THRESHOLD: 225
        // },
        // 'pinky': {
        //     PULSATION_ON_THRESHOLD: -55,
        //     PULSATION_OFF_THRESHOLD: 125
        // },
        // 'thumb': {
        //     PULSATION_ON_THRESHOLD: -55,
        //     PULSATION_OFF_THRESHOLD: 225
        // }
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
        this.movHistory = [];
    };

    PulsateFingerDetector.prototype.updateAndGetStatus = function(fingerInfo, chord, frame) {
        var isNewPulse = false;
        fingerInfo.palmVelocity = frame.hands[0].palmVelocity;
        this._addInfoToHistory(fingerInfo);
        if(this._pulseStarted()) {
            isNewPulse = true;
            this.pulsating = true;
        } else if(this._fingerIsGoingOff()) {
            this.pulsating = false;
            //TODO we can add the finger going off info here
        }

        return {
            justStartedPulsating: isNewPulse,
            isPulsating: this.pulsating
        };
    };

    PulsateFingerDetector.prototype._addInfoToHistory = function(fingerInfo) {
        this.movHistory.push(fingerInfo);
        if(this.movHistory.length >= HISTORY_SIZE) {
            this.movHistory.shift();
        }
    };

    PulsateFingerDetector.prototype._pulseStarted = function() {
        var lastMovement = _.last(this.movHistory);
        var oldMovement, yVelocityIsEnough, otherVelocityIsNotHigh;
        if(lastMovement.yVelocity < 0) {
            return false; //Finger is still going down
        }
        for(var i=this.movHistory.length - 2; i>=0; i--) {
            oldMovement = this.movHistory[i];
            yVelocityIsEnough = ((getFingerYVelocity(oldMovement)) < this.params.PULSATION_ON_THRESHOLD);
            otherVelocityIsNotHigh = Math.abs(oldMovement.yVelocity) > Math.abs(oldMovement.xVelocity) && Math.abs(oldMovement.yVelocity) > Math.abs(oldMovement.zVelocity);
            if(yVelocityIsEnough && otherVelocityIsNotHigh) {
                //Finger was going down at some point with enough speed (and now it stopped)
                this._removeHistoryButLast();
                return true;
            }
            if(oldMovement.yVelocity > 0) {
                //When we see a movement going up we know it is not a pulse (if we didn't detect it yet)
                this._removeHistoryButLast();
                return false;
            }
        }
        return false;
    };

    function getFingerYVelocity(fingerInfo) {
        return fingerInfo.yVelocity - fingerInfo.palmVelocity[1];
    }

    PulsateFingerDetector.prototype._removeHistoryButLast = function() {
        this.movHistory = [_.last(this.movHistory)];
    };

    PulsateFingerDetector.prototype._fingerIsGoingOff = function() {
        var lastMovement = _.last(this.movHistory);
        var yVelocityIsEnough = (lastMovement.yVelocity > this.params.PULSATION_OFF_THRESHOLD);
        var otherVelocityIsNotHigh = Math.abs(lastMovement.yVelocity) > Math.abs(lastMovement.xVelocity) && Math.abs(lastMovement.yVelocity) > Math.abs(lastMovement.zVelocity);
        return yVelocityIsEnough && otherVelocityIsNotHigh;
    };

})();