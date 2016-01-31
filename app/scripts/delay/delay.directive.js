(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('delay', delay);

    function delay() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/delay/delay.tpl.html',
            controller: 'DelayController',
            controllerAs: 'vm'
        };
    }

})();