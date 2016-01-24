'use strict';

angular.module('chesireApp')
    // .factory('TremoloClass', function(Audiocontext) {
    .factory('TremoloClass', function(Audiocontext, MotionParamsHelper) {

        var TremoloClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        TremoloClass.prototype = {

            DEFAULT_DEPTH: 0.2,

            init: function(options) {
                this.options = options;
                this.gainController = Audiocontext.createGain();

                this.oscillatorGain = Audiocontext.createGain();

                this.oscillator = Audiocontext.createOscillator();
                this.oscillator.connect(this.oscillatorGain);
                this.oscillatorGain.connect(this.gainController.gain);
                
                this.oscillator.type = options.oscillatorType;
                this.oscillator.frequency.value = 3;
                this.oscillator.start();
            },

            getAudioNode: function() {
                return this.gainController;
            },

            updateSound: function(motionParams) {
                this._updateRate(motionParams);
                this._updateDepth(motionParams);
            },

            _updateRate: function(motionParams) {
                var newRateValue = this.options.rate;
                if(!!this.options.controls && !!this.options.controls.rate && !!this.options.controls.rate.enabled) {
                    newRateValue = MotionParamsHelper.getParamValue(this.options.controls.rate, motionParams);
                    newRateValue = this._adjustValue(newRateValue, this.options.minRate, this.options.maxRate);
                }
                this._setRateValue(newRateValue);
            },

            _updateDepth: function(motionParams) {
                var newDepthValue = this.options.depth || this.DEFAULT_DEPTH;
                if(!!this.options.controls && !!this.options.controls.depth  && !!this.options.controls.depth.enabled) {
                    newDepthValue = MotionParamsHelper.getParamValue(this.options.controls.depth, motionParams);
                }
                this._setDepthValue(newDepthValue);
            },

            _adjustValue: function(value, min, max) {
                return (value*(max-min)) + min;
            },

            _setRateValue: function(value) {
                if(this.oscillator.frequency.value !== value) {
                    //TODO: only change if it's a significant change
                    this.oscillator.frequency.value = value;
                }
            },

            _setDepthValue: function(value) {
                this.oscillatorGain.gain.value = value;
            },

            connectTo: function(destination) {
                if(destination.constructor.name !== 'AudioDestinationNode') {
                    destination = destination.getAudioNode();
                }
                this.connectedTo = destination;
                this.gainController.connect(destination);
            },

            destroy: function() {
                if(this.connectedTo && this.gainController) {
                    this.gainController.disconnect();
                    this.connectedTo = null;
                }
            }
        };

        return TremoloClass;
    });