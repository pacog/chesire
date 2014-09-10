'use strict';

angular.module('chesireApp')
    .factory('SynthElementFactory', function(OscillatorClass, TremoloClass) {

        var createSynthElement = function(synthElementOptions) {
            switch(synthElementOptions.type) {
                case 'oscillator':
                    return new OscillatorClass(synthElementOptions);
                case 'tremolo':
                    return new TremoloClass(synthElementOptions);
                default:
                    throw 'Error creating SynthElement, wrong type: ' + synthElementOptions.type;
            }
            
        };

        return {
            createSynthElement: createSynthElement
        };
    });