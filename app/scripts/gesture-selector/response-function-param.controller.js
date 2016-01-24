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
            var newValue = vm.selectedValue;
            if(vm.paramParentObject[vm.paramKey] !== newValue) {
                if(vm.isNumber) {
                    newValue = parseFloat(newValue);
                }
                vm.paramParentObject[vm.paramKey] = newValue;
                console.log('selectedValueChanged');
                if(angular.isFunction(vm.changeCallback)) {
                    $timeout(vm.changeCallback);
                }
            }
        }

    }

})();

