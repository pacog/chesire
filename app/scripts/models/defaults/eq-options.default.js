(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('eqOptionsDefault', eqOptionsDefault);

    function eqOptionsDefault(availableEqTypes) {
        var factory = {
            get: get
        };

        return factory;

        function get(options) {
            var eqOptions = {
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
                        name: 'EQ freq',
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
                        name: 'EQ Q',
                        enabled: true,
                        param: 'handDirectionY',
                        responseFunction: {
                            name: 'linear',
                            min: 0.1,
                            max: 0.9
                        }
                    },
                    'gain': {
                        name: 'EQ gain',
                        enabled: true,
                        param: 'handDirectionY',
                        responseFunction: {
                            name: 'linear',
                            min: 0.1,
                            max: 0.9
                        }
                    }
                }
            };
            eqOptions = angular.extend({}, eqOptions, options || {});
            return angular.extend(eqOptions);
        }
    }

})();