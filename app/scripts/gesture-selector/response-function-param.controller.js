(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ResponseFunctionParamController', ResponseFunctionParamController);

    function ResponseFunctionParamController($timeout) {

        var vm = this;

        vm.selectedValueChanged = selectedValueChanged;

        init();

        function init() {
            vm.selectedValue = vm.paramParentObject[vm.paramKey] || vm.paramInfo.value;
            vm.isBoolean = _.isBoolean(vm.paramInfo.value);
            vm.isNumber = _.isNumber(vm.paramInfo.value);
        }

        function selectedValueChanged() {
            $timeout(function() {
                var newValue = vm.selectedValue;
                if(vm.isNumber) {
                    newValue = parseFloat(newValue);
                }
                vm.paramParentObject[vm.paramKey] = newValue;
                if(angular.isFunction(vm.changeCallback)) {
                    vm.changeCallback();
                }
            });
            
        }

    }

})();

