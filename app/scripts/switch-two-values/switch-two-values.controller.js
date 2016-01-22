(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SwitchTwoValuesController', SwitchTwoValuesController);

    function SwitchTwoValuesController() {
        var vm = this;

        vm.selectValue = selectValue;

        init();

        function init() {
            if(!vm.bindModel) {
                vm.bindModel = vm.values[0].value;
            }
        }

        function selectValue(newValue) {
            if(vm.bindModel !== newValue) {
                // var oldValue = vm.bindModel;

                vm.bindModel = newValue;

                if(angular.isFunction(vm.changeCallback)) {
                    vm.changeCallback();
                }
            }
        }
    }

})();
