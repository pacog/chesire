(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('distortion', distortion);

    function distortion() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/distortion/distortion.tpl.html',
            controller: 'DistortionController',
            controllerAs: 'vm'
        };
    }

})();