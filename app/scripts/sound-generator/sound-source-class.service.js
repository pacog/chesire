(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SoundSourceClass', function(OscillatorClass, Audiocontext, MotionParamsHelper, NoiseGeneratorClass) {
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
                    this._createNoiseGenerator();

                    var enabledSources = this._getEnabledSources();
                    if(enabledSources > 0) {
                        this.gainController = Audiocontext.createGain();
                        this.merger = Audiocontext.createChannelMerger(enabledSources);
                        this.merger.connect(this.gainController);

                        this._connectAllNodes();
                    }
                },

                playNote: function(note, duration) {
                    for(var i=0; i<this._oscillators.length; i++) {
                        this._oscillators[i].playNote(note, duration);
                    }
                },

                connectTo: function(destination) {
                    if((destination.constructor.name !== 'AudioDestinationNode') && (destination.constructor.name !== 'GainNode')) {
                        destination = destination.getAudioNode();
                    }
                    this.connectedTo = destination;
                    this.gainController.connect(destination);
                },

                updateSound: function(motionParams) {
                    this._updateMainGain(motionParams);
                    this._updateAllSoundSources(motionParams);
                    this._updatePartialGains();
                },

                stopPlaying: function() {
                    this._setGainControllerValue(0);
                },

                _connectAllNodes: function() {
                    for(var i=0; i<this._oscillatorGains.length; i++) {
                        this._oscillatorGains[i].connect(this.merger);
                    }
                    if(this.noiseGeneratorGain) {
                        this.noiseGeneratorGain.connect(this.merger);
                    }
                },

                _getEnabledSources: function() {
                    var sources = 0;
                    for(var i=0; i<this._oscillators.length; i++) {
                        if(this._oscillators[i].options.enabled) {
                            sources++;
                        }
                    }
                    if(this.noiseGenerator && this.noiseGenerator.options.enabled) {
                        sources++;
                    }
                    return sources;
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
                    if(this.noiseGenerator && this.noiseGenerator.options.enabled) {
                        this.noiseGenerator.updateSound(motionParams);
                    }
                },

                _updatePartialGains: function() {
                    var totalGain = 0;
                    for(var i=0; i<this._oscillators.length; i++) {
                        totalGain += this._oscillators[i].getGain();
                    }
                    if(totalGain < 1) {
                        totalGain = 1;
                    }
                    for(i=0; i<this._oscillatorGains.length; i++) {
                        this._oscillatorGains[i].gain.value = 1/totalGain;
                    }
                    if(this.noiseGeneratorGain) {
                        this.noiseGeneratorGain.gain.value = 1/totalGain;
                    }
                },

                _createOscillators: function() {
                    this._oscillators = [];
                    this._oscillatorGains = [];
                    for(var i=0; i<this.options.oscillators.length; i++) {
                        var oscillatorInfo = this.options.oscillators[i];

                        if(oscillatorInfo.enabled) {
                            oscillatorInfo.generalSoundSource = this;
                            var newOscillator = new OscillatorClass(oscillatorInfo);
                            this._oscillators.push(newOscillator);
                            var newGainNode = Audiocontext.createGain();
                            newOscillator.connectTo(newGainNode);
                            this._oscillatorGains.push(newGainNode);
                        }

                    }
                },

                _createNoiseGenerator: function() {
                    this.noiseGenerator = null;
                    this.noiseGeneratorGain = null;

                    if(this.options.noise && this.options.noise.enabled) {
                        this.noiseGenerator = new NoiseGeneratorClass(this.options.noise);
                        this.noiseGeneratorGain = Audiocontext.createGain();
                        this.noiseGenerator.connectTo(this.noiseGeneratorGain);
                    }
                },

                destroy: function() {
                    for(var i=0; i<this._oscillators.length; i++) {
                        this._oscillators[i].destroy();
                    }
                    for(i=0; i<this._oscillatorGains.length; i++) {
                        this._oscillatorGains[i].disconnect();
                    }

                    this._oscillators = [];
                    this._oscillatorGains = [];

                    if(this.merger) {
                        this.merger.disconnect();
                        this.merger = null;
                    }

                    if(this.noiseGenerator) {
                        this.noiseGenerator.destroy();
                    }

                    if(this.noiseGeneratorGain) {
                        this.noiseGeneratorGain.disconnect();
                    }

                    this.noiseGenerator = null;
                    this.noiseGeneratorGain = null;


                    if(this.connectedTo && this.gainController) {
                        this.gainController.disconnect();
                        this.connectedTo = null;
                    }
                }
            };

            return SoundSourceClass;

        });


})();
