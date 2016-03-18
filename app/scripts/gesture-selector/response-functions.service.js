'use strict';

angular.module('chesireApp')
    .factory('ResponseFunctions', function() {
        var defaultLinearParams = {
            min: {
                name: 'Min Y',
                value: 0
            },
            max: {
                name: 'Max Y',
                value: 1
            },
            minX: {
                name: 'Min X',
                value: 0
            },
            maxX: {
                name: 'Max X',
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
                var maxX = userParams.maxX || defaultLinearParams.maxX.value;
                var minX = userParams.minX || defaultLinearParams.minX.value;
                var inverse = userParams.inverse || defaultLinearParams.inverse.value;

                var range = maxX - minX;
                var inputInRange = input;

                if(input <= minX) {
                    inputInRange = 0;
                } else if(input >= maxX) {
                    inputInRange = 1;
                } else if(range > 0) {
                    inputInRange = (input- minX)/range;
                }


                var result = min + inputInRange*(max-min);

                if(inverse) {
                    result = max - inputInRange*(max-min);
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
