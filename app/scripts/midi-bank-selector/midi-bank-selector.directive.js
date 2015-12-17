(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('midiBankSelector', midiBankSelector);

    function midiBankSelector() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/midi-bank-selector/midi-bank-selector.tpl.html',
            controller: 'MidiBankSelectorController',
            controllerAs: 'vm',
            scope: {}
        };
    }
})();