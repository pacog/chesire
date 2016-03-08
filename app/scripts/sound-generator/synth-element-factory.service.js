'use strict';

angular.module('chesireApp')
    .factory('SynthElementFactory', function(TremoloClass, EqualizerClass, DistortionClass, DelayClass) {

        var createSynthElement = function(synthElementOptions) {
            switch(synthElementOptions.type) {
                case 'tremolo':
                    return new TremoloClass(synthElementOptions);
                case 'equalizer':
                    return new EqualizerClass(synthElementOptions);
                case 'distortion':
                    return new DistortionClass(synthElementOptions);
                case 'delay':
                    return new DelayClass(synthElementOptions);
                default:
                    throw 'Error creating SynthElement, wrong type: ' + synthElementOptions.type;
            }
            
        };

        return {
            createSynthElement: createSynthElement
        };
    });