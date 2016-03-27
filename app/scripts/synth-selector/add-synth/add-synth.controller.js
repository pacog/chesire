(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('AddSynthController', AddSynthController);

    function AddSynthController($scope, currentModalInstance) {
        var vm = {};

        $scope.vm = vm;

        vm.createSynth = createSynth;

        init();

        function init() {
            vm.newSynthName = 'New synth';
        }

        function createSynth() {
            currentModalInstance.close(vm.newSynthName);
        }
    }

})();