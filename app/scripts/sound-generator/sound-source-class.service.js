(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SoundSourceClass', function(OscillatorClass, Audiocontext, MotionParamsHelper) {
            var SoundSourceClass = function(options) {
                if(options) {
                    this.init(options);
                }
            };

            SoundSourceClass.prototype = {

                connectedTo: null,

                DEFAULT_GAIN: 1,

                MIN_GAIN_CHANGE: 0.05,

                init: function(options) {
                    this.options = options;
                    this._createOscillators();
                    this.gainController = Audiocontext.createGain();

                    //TODO: do properly
                    this._oscillators[0].connectTo(this.gainController);

                    //Create a oscillator class for each one in settings
                    //Create a gain for each to connect to
                    //Regulate that in each iteration so the max sum of gains is 1
                    //create output gain, that is controlled with the gain controller
                },

                playNote: function(note, duration) {
                    for(var i=0; i<this._oscillators.length; i++) {
                        this._oscillators[i].playNote(note, duration);
                    }
                },

                connectTo: function(destination) {
                    if(destination.constructor.name !== 'AudioDestinationNode') {
                        destination = destination.getAudioNode();
                    }
                    this.connectedTo = destination;
                    this.gainController.connect(destination);
                },

                updateSound: function(motionParams) {
                    this._updateMainGain(motionParams);
                    this._updateAllSoundSources(motionParams);
                },

                stopPlaying: function() {
                    this._setGainControllerValue(0);
                },

                _setGainControllerValue: function(value) {
                    var prevValue = this.gainController.gain.value;
                    if(prevValue !== value) {
                        //If it is 0 or 1 we always set the value:
                        if(prevValue === 0 || prevValue === 1) {
                            this.gainController.gain.value = value;
                        }
                        //Otherwise, only if change is substantial
                        if(Math.abs(prevValue - value) > this.MIN_GAIN_CHANGE) {
                            this.gainController.gain.value = value;
                        }
                    }
                },

                changeScale: function(newScale) {
                    for(var i=0; i<this._oscillators.length; i++) {
                        this._oscillators[i].changeScale(newScale);
                    }
                },

                _updateMainGain: function(motionParams) {
                    var newGainValue = this.DEFAULT_GAIN;
                    if(!!this.options.controls && !!this.options.controls.gain) {
                        newGainValue = MotionParamsHelper.getParamValue(this.options.controls.gain, motionParams);
                    }
                    this._setGainControllerValue(newGainValue);
                },

                _updateAllSoundSources: function(motionParams) {
                    for(var i=0; i<this._oscillators.length; i++) {
                        this._oscillators[i].updateSound(motionParams);
                    }
                },

                _createOscillators: function() {
                    this._oscillators = [];
                    for(var i=0; i<this.options.oscillators.length; i++) {
                        var oscillatorInfo = this.options.oscillators[i];

                        if(oscillatorInfo.enabled) {
                            this._oscillators.push(new OscillatorClass(oscillatorInfo));
                        }

                    }
                },

                destroy: function() {
                    for(var i=0; i<this._oscillators.length; i++) {
                        this._oscillators[i].destroy();
                    }
                    this._oscillators = [];

                    if(this.connectedTo && this.gainController) {
                        this.gainController.disconnect();
                        this.connectedTo = null;
                    }
                }
            };

            return SoundSourceClass;

        });


})();
