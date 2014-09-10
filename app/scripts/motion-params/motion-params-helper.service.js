'use strict';

angular.module('chesireApp')
    .factory('MotionParamsHelper', function(ResponseFunctions) {

        var getParamValue = function(controlInfo, motionParams) {
            var responseFunction = ResponseFunctions[controlInfo.responseFunction.name];
            var inputValue = motionParams[controlInfo.param];
            return responseFunction.getResponse(inputValue, controlInfo.responseFunction);
        };

        return {
            getParamValue: getParamValue
        };
    });