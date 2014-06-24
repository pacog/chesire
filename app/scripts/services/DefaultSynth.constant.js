'use strict';

angular.module('chesireApp')

  .factory('DefaultSynth', function(AvailableOscillators) {

        return {
            name: 'Default synth',
            components: [{
                type: 'oscillator',
                oscillatorType: AvailableOscillators[1],
                controls: {
                    'gain': {
                        //TODO: change min and max for a function
                        min: 0,
                        param: 'handDirectionY',
                        max: 1
                    }
                }
            }],
            oscillator: AvailableOscillators[1],
            vibrato: {
                freq: {
                    initial: 10,
                    min: 4,
                    max: 20,
                    param: 'y',
                    inverse: true
                },
                gain: {
                    initial: 0,
                    min: 0,
                    max: 1,
                    param: 'z',
                    inverse: true
                }
            },
            volume: {
                initial: 0.5,
                min: 0,
                max: 0.8,
                param: 'handDirectionY',
                inverse: true
            },
            snap: function(x) {
                var SNAP_DISTANCE = 0.35;

                if(x<SNAP_DISTANCE) {
                    return 0;
                }
                if(x>=SNAP_DISTANCE && x < (1-SNAP_DISTANCE)) {
                    return (x - SNAP_DISTANCE)/(1 - (2*SNAP_DISTANCE));
                }
                return 1;
            }
        };
    });