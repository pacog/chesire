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
                controls: {
                    'rate': {
                        param: 'z',
                        responseFunction: {
                            name: 'linear',
                            min: 1,
                            max: 10,
                            inverse: true
                        }
                    },
                    'depth': {
                        param: 'handDirectionY',
                        responseFunction: {
                            name: 'linear',
                            stepOn: 0.2,
                            stepOff: 0.9
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