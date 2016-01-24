(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('gestureSelector', gestureSelector);

    function gestureSelector() {
        return {
            templateUrl: 'scripts/gesture-selector/gesture-selector.html',
            restrict: 'E',
            controller: 'GestureSelectorController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                gestureObject: '=',
                changeCallback: '&'
            }
        };
    }

})();