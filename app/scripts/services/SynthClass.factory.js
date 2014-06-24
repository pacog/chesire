'use strict';

angular.module('chesireApp')
    //TODO: Sound shouldn't be used here but in the SynthComponents
    .factory('SynthClass', function(Audiocontext, OscillatorClass) {

        var SynthClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        SynthClass.prototype = {

            currentHand: 'NO_HAND',

            init: function(options) {
                this.synthOptions = angular.copy(options);
                this._createComponents();
            },

            _createComponents: function() {
                if(this._areOptionsCorrect()) {
                    //TODO: factory of components, each one is created and connected
                    this.oscillator = new OscillatorClass(this.synthOptions.components[0]);
                    this.oscillator.connectTo(Audiocontext.destination);
                    //TODO: create the rest of components and connect them
                    // var lastComponent <- connect this one to the output
                } else {
                    throw 'SynthClass: error creating components, wrong options';
                }
            },

            _areOptionsCorrect: function() {
                if(this.synthOptions) {
                    var thereIsAnOscillator = (!!this.synthOptions.components && !!this.synthOptions.components[0] && (this.synthOptions.components[0].type === 'oscillator'));
                    return thereIsAnOscillator;
                }
                return false;
            },

            scaleChanged: function(newScale) {
                this.oscillator.changeScale(newScale);
            },

            stopPlaying: function() {
                // Sound.stopPlaying();
            },

            updateSound: function(handInfo, motionParams) {
                // this.updateVolume(motionParams);
                // this.updateVibrato(motionParams);
                this.updateNoteSources(motionParams.x);

                if(this.currentHand !== handInfo.id) {
                    // TODO: why stopPlaying? handle this another way
                    // Sound.stopPlaying();
                    this.currentHand = handInfo.id;
                }
            },

            updateVolume: function(/*motionParams*/) {
                // var volumeInfo = this.synthOptions.volume;
                // Sound.changeGain(this.getParamValue(volumeInfo, motionParams));
            },

            updateVibrato: function(/*motionParams*/) {
                // var gainInfo = this.synthOptions.vibrato.gain;
                // Sound.changeVibratoGain(this.getParamValue(gainInfo, motionParams));

                // var freqInfo = this.synthOptions.vibrato.freq;
                // Sound.changeVibratoFreq(this.getParamValue(freqInfo, motionParams));
            },

            updateNoteSources: function(x) {
                this.oscillator.updateNotesBeingPlayed(x);
            },

            getParamValue: function(paramInfo, motionParams) {

                //If there is a param and a value for vibrato gain
                if(paramInfo.param && !angular.isUndefined(motionParams[paramInfo.param])) {
                    
                    if(paramInfo.inverse) {
                        return paramInfo.min + (paramInfo.max - paramInfo.min)*(motionParams[paramInfo.param]-1);
                    } else {
                        return paramInfo.min + (paramInfo.max - paramInfo.min)*motionParams[paramInfo.param];
                    }
                } else {
                    return paramInfo.initial;
                }
            },

            destroy: function() {

            }
        };

        return SynthClass;
    });