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

                var currentParams = {
                    maxY: userParams.max || defaultLinearParams.max.value,
                    minY: userParams.min || defaultLinearParams.min.value,
                    maxX: userParams.maxX || defaultLinearParams.maxX.value,
                    minX: userParams.minX || defaultLinearParams.minX.value,
                    inverse: userParams.inverse || defaultLinearParams.inverse.value
                };

                return linearResponse(input, currentParams);
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

        var defaultMiddleParams = {
            minY: {
                name: 'Min Y',
                value: 0
            },
            maxY: {
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
            center: {
                name: 'Center',
                value: 0.5
            },
            inverse: {
                name: 'Inverse',
                value: false
            }
        };
        var middle = {
            name: 'middle',
            params: defaultMiddleParams,
            getResponse: function(input, userParams) {
                var center = userParams.center || defaultMiddleParams.center.value;

                var maxX = userParams.maxX || defaultMiddleParams.maxX.value;
                var minX = userParams.minX || defaultMiddleParams.minX.value;
                var inverse = userParams.inverse || defaultMiddleParams.inverse.value;

                var params = {
                    minY: userParams.minY || defaultMiddleParams.minY.value,
                    maxY: userParams.maxY || defaultMiddleParams.maxY.value
                };

                if(input <= center) {
                    params.minX = Math.min(minX, center);
                    params.maxX = center;
                    params.inverse = inverse;
                } else {
                    params.minX = center;
                    params.maxX = Math.max(maxX, center);
                    params.inverse = !inverse;
                }

                return linearResponse(input, params);
            }
        };

        return {
            linear: linear,
            step: step,
            middle: middle
        };

        function linearResponse(input, params) {
            var range = params.maxX - params.minX;
            var inputInRange = input;

            if(input <= params.minX) {
                inputInRange = 0;
            } else if(input >= params.maxX) {
                inputInRange = 1;
            } else if(range > 0) {
                inputInRange = (input- params.minX)/range;
            }


            var result = params.minY + inputInRange*(params.maxY - params.minY);

            if(params.inverse) {
                result = params.maxY - inputInRange*(params.maxY - params.minY);
            }
            if(result < params.minY) {
                result = params.minY;
            }
            if(result > params.maxY) {
                result = params.maxY;
            }

            return result;
        }
    });
