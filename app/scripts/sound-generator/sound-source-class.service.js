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
                    this._createSources();

                    var enabledSources = this._getEnabledSources();
                    this.gainController = Audiocontext.createGain();
                    if(enabledSources > 0) {
                        this.merger = Audiocontext.createChannelMerger(1);
                        this.merger.connect(this.gainController);
                    }
                    this._connectAllNodes();
                },

                playNote: function(note, duration) {
                    for(var i=0; i<this._sources.length; i++) {
                        this._sources[i].playNote(note, duration);
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
                    for(var i=0; i<this._gains.length; i++) {
                        this._gains[i].connect(this.merger, 0, 0);
                    }
                },

                _getEnabledSources: function() {
                    return this._gains.length;
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
                    for(var i=0; i<this._sources.length; i++) {
                        this._sources[i].changeScale(newScale);
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
                    for(var i=0; i<this._sources.length; i++) {
                        this._sources[i].updateSound(motionParams);
                    }
                },

                _updatePartialGains: function() {
                    var totalGain = 0;
                    for(var i=0; i<this._sources.length; i++) {
                        totalGain += this._sources[i].getGain();
                    }
                    if(totalGain < 1) {
                        totalGain = 1;
                    }
                    for(i=0; i<this._gains.length; i++) {
                        this._gains[i].gain.value = 1/totalGain;
                    }
                },

                _createSources: function() {
                    this._sources = [];
                    this._gains = [];
                    this._createOscillators();
                    this._createNoiseGenerators();
                },

                _createOscillators: function() {
                    for(var i=0; i<this.options.oscillators.length; i++) {
                        var oscillatorInfo = this.options.oscillators[i];

                        if(oscillatorInfo.enabled) {
                            oscillatorInfo.generalSoundSource = this;
                            var newOscillator = new OscillatorClass(oscillatorInfo);
                            this._sources.push(newOscillator);
                            var newGainNode = Audiocontext.createGain();
                            newOscillator.connectTo(newGainNode);
                            this._gains.push(newGainNode);
                        }

                    }
                },

                _createNoiseGenerators: function() {
                    for(var i=0; i<this.options.noises.length; i++) {
                        var noiseInfo = this.options.noises[i];

                        if(noiseInfo.enabled) {
                            noiseInfo.generalSoundSource = this;
                            var newNoiseGenerator = new NoiseGeneratorClass(noiseInfo);
                            this._sources.push(newNoiseGenerator);
                            var newGainNode = Audiocontext.createGain();
                            newNoiseGenerator.connectTo(newGainNode);
                            this._gains.push(newGainNode);
                        }

                    }

                },

                destroy: function() {
                    this._destroySources();

                    if(this.merger) {
                        this.merger.disconnect();
                        this.merger = null;
                    }

                    if(this.connectedTo && this.gainController) {
                        this.gainController.disconnect();
                        this.connectedTo = null;
                    }
                },

                _destroySources: function() {
                    for(var i=0; i<this._sources.length; i++) {
                        this._sources[i].destroy();
                    }
                    for(i=0; i<this._gains.length; i++) {
                        this._gains[i].disconnect();
                    }

                    this._sources = [];
                    this._gains = [];
                }
            };

            return SoundSourceClass;

        });

})();
