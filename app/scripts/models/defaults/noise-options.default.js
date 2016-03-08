(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('noiseOptionsDefault', noiseOptionsDefault);

    function noiseOptionsDefault() {
        var factory = {
            get: get
        };

        return factory;

        function get(options) {
            var noiseOptions = {
                gain: 1,
                enabled: true,
                name: 'Noise',
                type: 'noise',
                noiseType: 'white',
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
            };
            noiseOptions = angular.extend({}, noiseOptions, options || {});
            return angular.extend(noiseOptions);
        }
    }

})();
