(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('delayOptionsDefault', delayOptionsDefault);

    function delayOptionsDefault() {
        var factory = {
            get: get
        };

        return factory;

        function get(options) {
            var delayOptions = {
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
                        name: 'Delay time',
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
                        name: 'Delay feedback',
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
            };
            delayOptions = angular.extend({}, delayOptions, options || {});
            return angular.extend(delayOptions);
        }
    }

})();