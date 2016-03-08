(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('synthOptionsAudioDefault', synthOptionsAudioDefault);

    function synthOptionsAudioDefault(availableOscillators, availableSimpleOscillators, availableEqTypes, oscillatorOptionsDefault, noiseOptionsDefault) {
        var factory = {
            get: get
        };

        return factory;

        function get() {
            return {
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
                },
                oscillators: [
                    oscillatorOptionsDefault.get(),
                    oscillatorOptionsDefault.get({
                        enabled: false,
                        oscillatorType: availableOscillators[2]
                    }),
                    oscillatorOptionsDefault.get({
                        enabled: false,
                        oscillatorType: availableOscillators[3]
                    })
                ],
                noise: noiseOptionsDefault.get(),
                components: [{
                    name: 'Tremolo',
                    type: 'tremolo',
                    oscillatorType: availableSimpleOscillators[1],
                    enabled: false,

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
                }, {
                    name: 'EQ',
                    type: 'equalizer',
                    enabled: true,

                    eqType: availableEqTypes[0],

                    DEFAULT_MIN_Q: 1,
                    DEFAULT_MAX_Q: 30,
                    minQ: 1,
                    maxQ: 10,
                    q: 5,

                    DEFAULT_MIN_FREQ: 20,
                    DEFAULT_MAX_FREQ: 22000,
                    minFreq: 20,
                    maxFreq: 22000,
                    freq: 220,

                    DEFAULT_MIN_GAIN: -40,
                    DEFAULT_MAX_GAIN: 40,
                    minGain: -20,
                    maxGain: 20,
                    gain: 1,

                    controls: {
                        'freq': {
                            enabled: true,
                            param: 'z',
                            responseFunction: {
                                name: 'linear',
                                min: 0,
                                max: 1,
                                inverse: true
                            }
                        },
                        'q': {
                            enabled: true,
                            param: 'handDirectionY',
                            responseFunction: {
                                name: 'linear',
                                min: 0.1,
                                max: 0.9
                            }
                        },
                        'gain': {
                            enabled: true,
                            param: 'handDirectionY',
                            responseFunction: {
                                name: 'linear',
                                min: 0.1,
                                max: 0.9
                            }
                        }
                    }
                }, {
                    name: 'Distortion',
                    type: 'distortion',
                    enabled: true,

                    MIN_AMOUNT: 0,
                    MAX_AMOUNT: 100,
                    amount: 10,

                    controls: {
                        'amount': {
                            enabled: true,
                            param: 'z',
                            responseFunction: {
                                name: 'linear',
                                min: 0,
                                max: 1,
                                inverse: true
                            }
                        }
                    }
                }, {
                    name: 'Delay',
                    type: 'delay',
                    enabled: true,

                    MIN_DELAY: 0.01,
                    MAX_DELAY: 3,
                    minDelay: 0.2,
                    maxDelay: 0.8,
                    delay: 0.3, //s

                    feedback: 0.1, //0-1

                    cutoff: 1000,//Hz

                    controls: {
                        'delay': {
                            enabled: true,
                            param: 'z',
                            responseFunction: {
                                name: 'linear',
                                min: 0,
                                max: 1,
                                inverse: true
                            }
                        },
                        'feedback': {
                            enabled: false,
                            param: 'z',
                            responseFunction: {
                                name: 'linear',
                                min: 0,
                                max: 1,
                                inverse: true
                            }
                        }
                    }
                }]
            };
        }

    }

})();