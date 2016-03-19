(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('tremoloOptionsDefault', tremoloOptionsDefault);

    function tremoloOptionsDefault(availableSimpleOscillators) {
        var factory = {
            get: get
        };

        return factory;

        function get(options) {
            var tremoloOptions = {
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
                        name: 'Tremolo rate',
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
                        name: 'Tremolo depth',
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
            tremoloOptions = angular.extend({}, tremoloOptions, options || {});
            return angular.extend(tremoloOptions);
        }
    }

})();


