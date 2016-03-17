(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('DelayClass', DelayClassFactory);

    function DelayClassFactory(Audiocontext, MotionParamsHelper) {

        var DelayClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        DelayClass.prototype = {

            init: function(options) {
                this.options = options;
                this.delay = Audiocontext.createDelay();
                this.feedback = Audiocontext.createGain();
                this.filter = Audiocontext.createBiquadFilter();
                this.filter.frequency.value = this.options.cutoff;

                this.delay.connect(this.feedback);
                this.feedback.connect(this.filter);
                this.filter.connect(this.delay);

                this.endPoint = Audiocontext.createGain();
                this.endPoint.gain.value = 1;

                this.startPoint = Audiocontext.createGain();
                this.startPoint.gain.value = 1;

                this.startPoint.connect(this.delay);
                this.startPoint.connect(this.endPoint);

                this.delay.connect(this.endPoint);
            },

            getAudioNode: function() {
                return this.startPoint;
            },

            updateSound: function(motionParams) {
                this._updateFeedback(motionParams);
                this._updateDelay(motionParams);
            },

            _updateFeedback: function(motionParams) {
                var newFeedback = this.options.feedback;
                if(!!this.options.controls && !!this.options.controls.feedback && !!this.options.controls.feedback.enabled) {
                    newFeedback = MotionParamsHelper.getParamValue(this.options.controls.feedback, motionParams);
                }
                this._setFeedbackValue(newFeedback);
            },

            _updateDelay: function(motionParams) {
                var newDelay = this.options.delay;
                if(!!this.options.controls && !!this.options.controls.delay && !!this.options.controls.delay.enabled) {
                    newDelay = MotionParamsHelper.getParamValue(this.options.controls.delay, motionParams);
                    newDelay = this._adjustValue(newDelay, this.options.minDelay, this.options.maxDelay);
                }
                this._setDelayValue(newDelay);
            },

            _adjustValue: function(value, min, max) {
                min = parseFloat(min);
                max = parseFloat(max);
                return (value*(max-min)) + min;
            },

            _setFeedbackValue: function(value) {
                if(this.feedback.gain.value !== value) {
                    this.feedback.gain.value = value;
                }
            },

            _setDelayValue: function(value) {
                if(this.delay.delayTime.value !== value) {
                    this.delay.delayTime.value = value;
                }
            },

            connectTo: function(destination) {
                if((destination.constructor.name !== 'AudioDestinationNode') && (destination.constructor.name !== 'GainNode')) {
                    destination = destination.getAudioNode();
                }
                this.connectedTo = destination;
                this.endPoint.connect(destination);
            },

            destroy: function() {
                if(this.connectedTo && this.endPoint) {
                    this.endPoint.disconnect();
                    this.connectedTo = null;
                }
                if(this.delay) {
                    this.delay.disconnect();
                }
                if(this.feedback) {
                    this.feedback.disconnect();
                }
                if(this.filter) {
                    this.filter.disconnect();
                }
                if(this.startPoint) {
                    this.startPoint.disconnect();
                }
            }
        };

        return DelayClass;
    }

})();

