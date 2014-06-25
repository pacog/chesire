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
                        param: 'handDirectionY',
                        responseFunction: {
                            name: 'linear',
                            min: 0.2,
                            max: 0.9,
                            inverse: true
                        }
                    }
                }
            }],
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