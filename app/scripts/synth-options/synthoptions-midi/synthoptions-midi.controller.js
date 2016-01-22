(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SynthoptionsMidiController', SynthoptionsMidiController);

    function SynthoptionsMidiController(DefaultEmptyControl) {
        var vm = this;

        vm.addControl = function() {
            vm.synthoptions.getActiveControls().push(angular.copy(DefaultEmptyControl));
        };
    }

})();