(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthoptionsAudioModel', SynthoptionsAudioModel);

    function SynthoptionsAudioModel(availableOscillators) {
        var factory = {
            create: create
        };

        //TODO use already existing service for this
        var DEFAULT_AUDIO_SYNTH_OPTIONS = {
            components: [{
                type: 'oscillator',
                midiControlMode: 'soft',
                oscillatorType: availableOscillators[1],
                snapDistance: 0.35,
                transitionType: 'glissando',
                controls: {
                    'gain': {
                        param: 'y',
                        responseFunction: {
                            name: 'linear',
                            min: 0.0,
                            max: 0.9,
                            inverse: true
                        }
                    }
                }
            }, {
                type: 'tremolo',
                oscillatorType: availableOscillators[1],
                enabled: true,

                DEFAULT_MIN_RATE: 1,
                DEFAULT_MAX_RATE: 10,
                minRate: 1,
                maxRate: 10,
                fixedRate: 5,
                rate: 3,

                depth: 0.2,

                controls: {
                    'rate': {
                        enabled: true,
                        param: 'z',
                        responseFunction: {
                            name: 'linear',
                            min: 0,
                            max: 1,
                            inverse: true
                        }
                    },
                    'depth': {
                        enabled: true,
                        param: 'handDirectionY',
                        responseFunction: {
                            name: 'linear',
                            min: 0.1,
                            max: 0.9
                        }
                    }
                }
            }]
        };

        function SynthoptionsAudioClass(options) {
            this.init(options);
        }

        SynthoptionsAudioClass.prototype.init = function(options) {
            options = options || {};
            angular.extend(this, DEFAULT_AUDIO_SYNTH_OPTIONS, options);
        };


        return factory;

        function create(options) {
            return new SynthoptionsAudioClass(options);
        }
    }

})();