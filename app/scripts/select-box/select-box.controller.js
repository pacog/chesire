(function() {
    'use strict';

    angular.module('chesireApp')

    .controller('SelectBoxController', SelectBoxController);

    function SelectBoxController($timeout) {

        var vm = this;

        vm.toggleList = toggleList;

        vm.selectValue = selectValue;

        init();

        function init() {
            vm.listExpanded = false;
        }

        function toggleList() {
            vm.listExpanded = !vm.listExpanded;
        }

        function selectValue(newValue) {
            vm.value = newValue;
            vm.listExpanded = false;
            if(angular.isFunction(vm.changeCallback)) {
                $timeout(vm.changeCallback);
            }
        }
    }

})();





