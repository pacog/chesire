(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('HelperVisualsController', HelperVisualsController);

    function HelperVisualsController(Leapmotion) {
        var PARTIAL_VALUES_TO_STORE = 100;
        var vm = this;
        init();

        vm.motionsTracked = {};

        function init() {
            Leapmotion.subscribeToFrameChange(updateMotionInfo);
        }

        function updateMotionInfo(frame) {
            var frameInfo = frame.frame;
            if(frameInfo && !_.isEmpty(frameInfo.hands)) {
                var motionParams = Leapmotion.getRelativePositions(frameInfo, frameInfo.hands);
                storeMotion('pulsateX', motionParams.fingersPulsationInfo.indexFinger.xVelocity);
                storeMotion('pulsateY', motionParams.fingersPulsationInfo.indexFinger.yVelocity);
                storeMotion('pulsateZ', motionParams.fingersPulsationInfo.indexFinger.zVelocity);
            }
        }

        function storeMotion(name, value) {
            vm.motionsTracked[name] = vm.motionsTracked[name] || {
                name: name
            };

            var obj = vm.motionsTracked[name];
            obj.actualValue = value;

            obj.allValues = obj.allValues || [];
            obj.allValues.push(value);
            if(obj.allValues.length >= PARTIAL_VALUES_TO_STORE) {
                obj.allValues.shift();
            }
            var max = obj.allValues[0];
            var min = obj.allValues[0];
            for(var i=0; i<obj.allValues.length; i++) {
                if(obj.allValues[i] < min) {
                    min = obj.allValues[i];
                }
                if(obj.allValues[i] > max) {
                    max = obj.allValues[i];
                }
            }
            obj.min = min;
            obj.max = max;
        }

        
    }

})();