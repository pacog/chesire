(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('GestureSelectorController', GestureSelectorController);

    function GestureSelectorController($scope, MotionParamsList) {
        var vm = this;

        vm.availableGestures = MotionParamsList;
    }
})();



