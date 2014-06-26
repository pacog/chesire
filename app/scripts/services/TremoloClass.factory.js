'use strict';

angular.module('chesireApp')
    .factory('TremoloClass', function(Audiocontext, MotionParamHelper) {

        var TremoloClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        TremoloClass.prototype = {

            DEFAULT_RATE: 10,

            DEFAULT_DEPTH: 0.2,

            init: function(options) {
                this.options = options;
                this.gainController = Audiocontext.createGainNode();
                this.oscillator = Audiocontext.createOscillator();
                this.oscillator.connect(this.gainController.gain);
                //TODO use correct oscillator type
                this.oscillator.type = this.oscillator.SINE;
            },

            getAudioNode: function() {
                return this.gainController;
            },

            updateSound: function(motionParams) {
                var newRateValue = this.DEFAULT_RATE;
                if(!!this.options.controls && !!this.options.controls.rate) {
                    newRateValue = MotionParamHelper.getParamValue(this.options.controls.rate, motionParams);
                }
                console.log(newRateValue);
                this._setRateValue(newRateValue);

                // var newRateValue = this.DEFAULT_RATE;
                // if(!!this.options.controls && !!this.options.controls.rate) {
                //     newRateValue = MotionParamHelper.getParamValue(this.options.controls.rate, motionParams);
                // }
                // this._setRateValue(newRateValue);
            },

            _setRateValue: function(value) {
                if(this.oscillator.frequency.value !== value) {
                    //TODO: only change if it's a significant change
                    this.oscillator.frequency.value = value;
                }
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
                    this.gainController.disconnect(this.connectedTo);
                }
            }
        };

        return TremoloClass;
    });