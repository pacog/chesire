'use strict';

angular.module('chesireApp')
    .factory('EqualizerClass', function(Audiocontext, MotionParamsHelper) {

        var EqualizerClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        EqualizerClass.prototype = {

            init: function(options) {
                this.options = options;
                this.filter = Audiocontext.createBiquadFilter();
                this.filter.type = options.eqType.id;
            },

            getAudioNode: function() {
                return this.filter;
            },

            updateSound: function(motionParams) {
                if(this.options.eqType.usesQ) {
                    this._updateQ(motionParams);
                }
                if(this.options.eqType.usesGain) {
                    this._updateGain(motionParams);
                }
                this._updateFrequency(motionParams);
            },

            _updateQ: function(motionParams) {
                var newQvalue = this.options.q;
                if(!!this.options.controls && !!this.options.controls.q && !!this.options.controls.q.enabled) {
                    newQvalue = MotionParamsHelper.getParamValue(this.options.controls.q, motionParams);
                    newQvalue = this._adjustValue(newQvalue, this.options.minQ, this.options.maxQ);
                }
                this._setQValue(newQvalue);
            },

            _updateFrequency: function(motionParams) {
                var newFreqValue = this.options.freq;
                if(!!this.options.controls && !!this.options.controls.freq  && !!this.options.controls.freq.enabled) {
                    newFreqValue = MotionParamsHelper.getParamValue(this.options.controls.freq, motionParams);
                    //TODO: do this logaritmically?
                    newFreqValue = this._adjustValue(newFreqValue, this.options.minFreq, this.options.maxFreq);
                }
                this._setFreqValue(newFreqValue);
            },

            _updateGain: function(motionParams) {
                var newGainValue = this.options.gain;
                if(!!this.options.controls && !!this.options.controls.gain  && !!this.options.controls.gain.enabled) {
                    newGainValue = MotionParamsHelper.getParamValue(this.options.controls.gain, motionParams);
                    newGainValue = this._adjustValue(newGainValue, this.options.minGain, this.options.maxGain);
                }
                this._setGainValue(newGainValue);
            },

            _adjustValue: function(value, min, max) {
                min = parseFloat(min);
                max = parseFloat(max);
                return (value*(max-min)) + min;
            },

            _setQValue: function(value) {
                if(this.filter.Q.value !== value) {
                    this.filter.Q.value = value;
                }
            },

            _setFreqValue: function(value) {
                if(this.filter.frequency.value !== value) {
                    this.filter.frequency.value = value;
                }
            },

            _setGainValue: function(value) {
                if(this.filter.gain.value !== value) {
                    this.filter.gain.value = value;
                }
            },

            connectTo: function(destination) {
                if(destination.constructor.name !== 'AudioDestinationNode') {
                    destination = destination.getAudioNode();
                }
                this.connectedTo = destination;
                this.filter.connect(destination);
            },

            destroy: function() {
                if(this.connectedTo && this.filter) {
                    this.filter.disconnect();
                    this.connectedTo = null;
                }
            }
        };

        return EqualizerClass;
    });