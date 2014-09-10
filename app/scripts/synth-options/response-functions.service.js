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

                var result = min + input*(max-min);

                if(inverse) {
                    result = max - input*(max-min);
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

        var defaultStepParams = {
            step: {
                name: 'Step',
                value: 0.5
            },
            inverse: {
                name: 'Inverse',
                value: false
            },
            stepOn: {
                name: 'StepOn',
                value: 1
            },
            stepOff: {
                name: 'StepOff',
                value: 0
            }
        };
        var step = {
            name: 'step',
            params: defaultStepParams,
            getResponse: function(input, userParams) {
                var step = userParams.step || defaultStepParams.step.value;
                var inverse = userParams.inverse || defaultStepParams.inverse.value;
                var stepOn = userParams.stepOn || defaultStepParams.stepOn.value;
                var stepOff = userParams.stepOff || defaultStepParams.stepOff.value;

                var result;
                if(inverse) {
                    result = stepOn;
                    if(input > step) {
                        result = stepOff;
                    }
                } else {
                    result = stepOff;
                    if(input > step) {
                        result = stepOn;
                    }
                }
                return result;
            }
        };

        return {
            linear: linear,
            step: step
        };
    });