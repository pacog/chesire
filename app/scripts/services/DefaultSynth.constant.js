'use strict';

angular.module('chesireApp')
  .factory('DefaultSynth', function(AvailableOscillators) {

        return {
            name: 'Default synth',
            components: [{
                type: 'oscillator',
                oscillatorType: AvailableOscillators[1],
                snapDistance: 0.35,
                controls: {
                    'gain': {
                        param: 'handDirectionY',
                        responseFunction: {
                            name: 'linear',
                            min: 0.0,
                            max: 0.9,
                            inverse: true
                        }
                    }
                }
            }/*, {
                type: 'tremolo',
                oscillatorType: AvailableOscillators[2],
                controls: {
                    'rate': {
                        param: 'handDirectionY',
                        responseFunction: {
                            name: 'linear',
                            min: 5,
                            max: 100,
                            inverse: true
                        }
                    },
                    'depth': {
                        param: 'handDirectionY',
                        responseFunction: {
                            name: 'step',
                            stepOn: 0.2,
                            stepOff: 0.9
                        }
                    }
                }
            }*/],
            controls: [{
                number: 76,
                param: 'y',
                responseFunction: {
                    name: 'linear',
                    min: 0.0,
                    max: 1.0,
                    inverse: true
                }
            }]
        };
    });