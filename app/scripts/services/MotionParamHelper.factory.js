'use strict';

angular.module('chesireApp')
    .factory('MotionParamHelper', function() {

        var getParamValue = function(controlInfo, motionParams) {
            return controlInfo.min + (controlInfo.max - controlInfo.min)*motionParams[controlInfo.param];
        };

        return {
            getParamValue: getParamValue
        };
    });