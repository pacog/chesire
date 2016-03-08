(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthoptionsAudioModel', SynthoptionsAudioModel);

    function SynthoptionsAudioModel(synthOptionsAudioDefault, oscillatorOptionsDefault, noiseOptionsDefault) {
        var OSCILLATORS_NUMBER = 3;
        var factory = {
            create: create
        };

        function SynthoptionsAudioClass(options) {
            this.init(options);
        }

        SynthoptionsAudioClass.prototype.init = function(options) {
            options = options || {};
            removeOscillatorFromComponents(options);
            addOscillatorsIfMissing(options);
            addNoiseIfMissing(options);
            removeExtraOscillators(options);
            angular.extend(this, synthOptionsAudioDefault.get(), options);
        };

        return factory;

        function create(options) {
            return new SynthoptionsAudioClass(options);
        }

        function removeOscillatorFromComponents(options) {
            var indexOfOscillator = _.findIndex(options.components, function(component) {
                return component.type === 'oscillator';
            });

            if(indexOfOscillator > -1) {
                var oscillator = options.components[indexOfOscillator];
                options.components.splice(indexOfOscillator, 1);
                options.oscillators = options.oscillators || [];
                options.oscillators.splice(0, 0, oscillator);
            }
        }

        function addOscillatorsIfMissing(options) {
            if(options.oscillators.length < OSCILLATORS_NUMBER) {
                for(var i=options.oscillators.length; i<OSCILLATORS_NUMBER; i++) {
                    var newOscillator = oscillatorOptionsDefault.get({enabled: false});
                    options.oscillators.push(newOscillator);
                }
            } else if(options.oscillators.length > OSCILLATORS_NUMBER) {
                options.oscillators.splice(OSCILLATORS_NUMBER, options.oscillators.length - OSCILLATORS_NUMBER);
            }
        }

        function removeExtraOscillators(options) {
            if(options.oscillators.length > OSCILLATORS_NUMBER) {
                options.oscillators.splice(OSCILLATORS_NUMBER, options.oscillators.length - OSCILLATORS_NUMBER);
            }
        }

        function addNoiseIfMissing(options) {
            if(!options.noise) {
                options.noise = noiseOptionsDefault.get();
            }
        }
    }

})();