(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('tremolo', tremolo);

    function tremolo() {
        return {
            templateUrl: 'scripts/tremolo/tremolo.tpl.html',
            restrict: 'E',
            controller: 'TremoloController',
            controllerAs: 'vm'
        };
    }

})();