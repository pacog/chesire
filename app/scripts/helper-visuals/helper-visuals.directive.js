(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('helperVisuals', helperVisuals);

    function helperVisuals() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/helper-visuals/helper-visuals.html',
            scope: {},
            controller: 'HelperVisualsController',
            controllerAs: 'vm'
        };
    }

})();