(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('songScaleCreator', songScaleCreator);

    function songScaleCreator() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/song-scale-creator/song-scale-creator.tpl.html',
            controller: 'SongScaleCreatorController',
            controllerAs: 'vm',
            scope: {}
        };
    }

})();