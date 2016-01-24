
(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ResponseFunctionController', ResponseFunctionController);

    function ResponseFunctionController($timeout, ResponseFunctions) {
        var RESPONSE_VALUES_NUMBER = 20;
        var vm = this;

        vm.responseFunctionChanged = responseFunctionChanged;
        vm.responseFunctionParamsChanged = responseFunctionParamsChanged;

        init();

        function init() {
            vm.availableResponseFunctions = ResponseFunctions;
            vm.selectedResponseFunction = ResponseFunctions[vm.responseFunctionInfo.name];
            calculateResponseValues();
        }

        function responseFunctionChanged() {
            if(vm.responseFunctionInfo.name !== vm.selectedResponseFunction.name) {
                vm.responseFunctionInfo.name = vm.selectedResponseFunction.name;
                calculateResponseValues();
                changeCallback();
            }
        }

        function calculateResponseValues() {
            vm.responseFunctionValues = [];
            var newValue;
            var x;
            var increment = 1/RESPONSE_VALUES_NUMBER;
            vm.responseFunctionIncrement = increment;
            for(var i=0; i<RESPONSE_VALUES_NUMBER; i++) {
                x = i*increment;
                newValue = getYValue(x, vm.responseFunctionInfo);
                vm.responseFunctionValues.push({
                    x: x,
                    y: newValue
                });
            }
        }

        function getYValue(x, responseFunctionInfo) {
            var totalMin = 0;
            var totalMax = 1;
            if(!angular.isUndefined(responseFunctionInfo.TOTAL_MIN)) {
                totalMin = responseFunctionInfo.TOTAL_MIN;
            }
            if(!angular.isUndefined(responseFunctionInfo.TOTAL_MAX)) {
                totalMax = responseFunctionInfo.TOTAL_MAX;
            }
            var maxLength = totalMax - totalMin;
            return vm.selectedResponseFunction.getResponse(x, vm.responseFunctionInfo)/maxLength;
        }

        function responseFunctionParamsChanged() {
            calculateResponseValues();
            changeCallback();
        }

        function changeCallback() {
            if(angular.isFunction(vm.changeCallback)) {
                $timeout(vm.changeCallback);
            }
        }
     }
})();
