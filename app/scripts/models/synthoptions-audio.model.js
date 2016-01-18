(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthoptionsAudioModel', SynthoptionsAudioModel);

    function SynthoptionsAudioModel() {
        var factory = {
            create: create
        };

        var DEFAULT_AUDIO_SYNTH_OPTIONS = {
            components: [{
                type: 'oscillator',
                midiControlMode: 'soft',
                oscillatorType: 'sine',
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