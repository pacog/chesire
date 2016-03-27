(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SingleControlHudController', SingleControlHudController);

    function SingleControlHudController($scope, Leapmotion, MotionParamsHelper) {
        var vm = this;

        init();

        function init() {
            Leapmotion.subscribeToFrameChange(updateOutput);
            $scope.$on('$destroy', onDestroy);
        }

        function updateOutput(frame) {
            var frameInfo = frame.frame;
            if(frameInfo && !_.isEmpty(frameInfo.hands)) {
                var motionParams = Leapmotion.getRelativePositions(frameInfo, frameInfo.hands);
                vm.outputValue = Math.round(100*MotionParamsHelper.getParamValue(vm.controlInfo, motionParams));
                vm.updateOutputValue(vm.outputValue);
            }
        }

        function onDestroy() {
            Leapmotion.unsubscribeToFrameChange(updateOutput);
        }
    }
})();
