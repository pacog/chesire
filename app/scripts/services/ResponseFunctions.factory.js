'use strict';

angular.module('chesireApp')
    .factory('ResponseFunctions', function() {
        var defaultLinearParams = {
            min: {
                name: 'Minimum',
                value: 0
            },
            max: {
                name: 'Maximum',
                value: 1
            },
            inverse: {
                name: 'Inverse',
                value: false
            }
        };
        var linear = {
            name: 'linear',
            params: defaultLinearParams,
            getResponse: function(input, userParams) {
                var max = userParams.max || defaultLinearParams.max.value;
                var min = userParams.min || defaultLinearParams.min.value;
                var inverse = userParams.inverse || defaultLinearParams.inverse.value;

                var result = input;
                if(inverse) {
                    result = 1 - result;
                }
                if(result<min) {
                    result = min;
                }
                if(result>max) {
                    result = max;
                }
                return result;
            }
        };

        return {
            linear: linear
        };
    });