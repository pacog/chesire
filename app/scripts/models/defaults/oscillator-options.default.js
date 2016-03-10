(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('oscillatorOptionsDefault', oscillatorOptionsDefault);

    function oscillatorOptionsDefault(availableOscillators) {
        var factory = {
            get: get
        };

        return factory;

        function get(options) {
            var oscillatorOptions = {
                gain: 1,
                enabled: true,
                name: 'Oscillator',
                type: 'oscillator',
                oscillatorType: availableOscillators[1],
                realPeriodicTable: [0, 0.4, 0.4, 1, 1, 1, 0.3, 0.7, 0.6, 0.5, 0.9, 0.8],
                imaginaryPeriodicTable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                controls: {
                    'gain': {
                        name: 'Oscillator Gain',
                        param: 'y',
                        responseFunction: {
                            name: 'linear',
                            min: 0.0,
                            max: 0.9,
                            inverse: true
                        }
                    }
                },
                fm: {
                    enabled: true,
                    depth: 0.7,
                    freq: 3.5,
                    controls: {
                        'depth': {
                            name: 'Oscillator FM depth',
                            enabled: true,
                            param: 'handDirectionY',
                            responseFunction: {
                                name: 'linear',
                                min: 0.0,
                                max: 0.9,
                                inverse: false
                            }
                        }
                    },
                    preModulator: {
                        enabled: true,
                        depth: 0.3,
                        freq: 4
                    }
                }
            };
            oscillatorOptions = angular.extend({}, oscillatorOptions, options || {});
            return angular.extend(oscillatorOptions);
        }
    }

})();
