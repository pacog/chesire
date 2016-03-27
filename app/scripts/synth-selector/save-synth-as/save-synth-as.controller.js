(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SaveSynthAsController', SaveSynthAsController);

    function SaveSynthAsController($scope, currentModalInstance, oldName) {
        var vm = {};

        $scope.vm = vm;

        vm.saveSynthAs = saveSynthAs;

        init();

        function init() {
            vm.newName = oldName;
        }

        function saveSynthAs() {
            currentModalInstance.close(vm.newName);
        }
    }

})();