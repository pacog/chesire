(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('synthOptionsAudioDefault', synthOptionsAudioDefault);


    function synthOptionsAudioDefault(availableOscillators, availableSimpleOscillators) {
        var factory = {
            get: get
        };

        return factory;

        function get() {
            return {
                components: [{
                    type: 'oscillator',
                    midiControlMode: 'soft',
                    oscillatorType: availableOscillators[1],
                    snapDistance: 0.35,
                    transitionType: 'glissando',
                    realPeriodicTable: [0, 0.4, 0.4, 1, 1, 1, 0.3, 0.7, 0.6, 0.5, 0.9, 0.8],
                    imaginaryPeriodicTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    fm: {
                        enabled: true,
                        depth: 0.5,
                        freq: 1
                    },
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
                    oscillatorType: availableSimpleOscillators[1],
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
        }

    }

})();