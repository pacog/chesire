(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('distortionOptionsDefault', distortionOptionsDefault);

    function distortionOptionsDefault() {
        var factory = {
            get: get
        };

        return factory;

        function get(options) {
            var distortionOptions = {
                name: 'Distortion',
                type: 'distortion',
                enabled: true,

                MIN_AMOUNT: 0,
                MAX_AMOUNT: 100,
                amount: 10,

                controls: {
                    'amount': {
                        name: 'Dist Amount',
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
            };
            distortionOptions = angular.extend({}, distortionOptions, options || {});
            return angular.extend(distortionOptions);
        }
    }

})();
