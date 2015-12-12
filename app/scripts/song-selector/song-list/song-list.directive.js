(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('songList', songList);

    function songList() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/song-selector/song-list/song-list.tpl.html',
            scope: {
                songs: '='
            },
            controller: 'SongListController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();