(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('componentsList', componentsList);

    function componentsList() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/synth-options/components-list/components-list.tpl.html',
            scope: {},
            controller: 'ComponentsListController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();