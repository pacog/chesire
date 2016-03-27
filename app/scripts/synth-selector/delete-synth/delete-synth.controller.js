(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('DeleteSynthController', DeleteSynthController);

    function DeleteSynthController($scope, currentModalInstance) {
        var vm = {};

        $scope.vm = vm;

        vm.cancel = cancel;
        vm.confirm = confirm;

        function cancel() {
            currentModalInstance.close(false);
        }

        function confirm() {
            currentModalInstance.close(true);
        }
    }

})();