(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('NoiseGeneratorClass', function(Audiocontext, MotionParamsHelper) {

            var SECONDS_OF_NOISE_LOOP = 3;
            //See http://noisehack.com/generate-noise-web-audio-api/

            var NoiseGeneratorClass = function(options) {
                if(options) {
                    this.init(options);
                }
            };

            NoiseGeneratorClass.prototype = {

                connectedTo: null,

                DEFAULT_GAIN: 1,

                MIN_GAIN_CHANGE: 0.05,

                init: function(options) {
                    this.options = options;
                    this.gainController = Audiocontext.createGain();
                    this.noiseGenerator = createNoiseSource(this.options.noiseType);
                    this.noiseGenerator.connect(this.gainController);
                },

                updateSound: function(motionParams) {
                    this._updateGain(motionParams);
                },

                _updateGain: function(motionParams) {
                    var newGainValue = this.options.gain;
                    if(angular.isUndefined(newGainValue)) {
                        newGainValue = this.DEFAULT_GAIN;
                    }
                    if(!!this.options.controls && !!this.options.controls.gain && !!this.options.controls.gain.enabled) {
                        newGainValue = MotionParamsHelper.getParamValue(this.options.controls.gain, motionParams);
                    }

                    this._setGainControllerValue(newGainValue);
                },

                getGain: function() {
                    if(!this.options.enabled) {
                        return 0;
                    }
                    return this.gainController.gain.value;
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

                connectTo: function(destination) {
                    this.connectedTo = destination;
                    this.gainController.connect(destination);
                },

                destroy: function() {
                    if(this.connectedTo && this.gainController) {
                        this.noiseGenerator.stop();
                        this.noiseGenerator.disconnect();
                        this.noiseGenerator = null;
                        this.gainController.disconnect();
                        this.connectedTo = null;
                    }
                }
            };

            return NoiseGeneratorClass;

            function createNoiseSource(type) {
                if(!type || (type === 'white')) {
                    var bufferSize = SECONDS_OF_NOISE_LOOP*Audiocontext.sampleRate;
                    var noiseBuffer = Audiocontext.createBuffer(1, bufferSize, Audiocontext.sampleRate);
                    var output = noiseBuffer.getChannelData(0);

                    for (var i = 0; i < bufferSize; i++) {
                        output[i] = Math.random() * 2 - 1;
                    }

                    var whiteNoise = Audiocontext.createBufferSource();
                    whiteNoise.buffer = noiseBuffer;
                    whiteNoise.loop = true;
                    whiteNoise.start(0);

                    return whiteNoise;
                }
            }
        });
})();