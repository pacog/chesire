(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthoptionsMidiModel', SynthoptionsMidiModel);

    function SynthoptionsMidiModel() {
        var factory = {
            create: create
        };

        var DEFAULT_MIDI_SYNTH_OPTIONS = {
            components: [{
                type: 'oscillator',
                midiControlMode: 'soft',
                oscillatorType: 'sine',
                snapDistance: 0.35,
                transitionType: 'volume',
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
            }],
            controls: []
        };

        function SynthoptionsMidiClass(options) {
            this.init(options);
        }

        SynthoptionsMidiClass.prototype.init = function(options) {
            options = options || {};
            angular.extend(this, DEFAULT_MIDI_SYNTH_OPTIONS, options);
        };


        return factory;

        function create(options) {
            return new SynthoptionsMidiClass(options);
        }
    }

})();