(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('songSelector', songSelector);

    function songSelector() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/song-selector/song-selector.tpl.html',
            scope: {},
            controller: 'SongSelectorController',
            controllerAs: 'vm'
        };
    }

})();