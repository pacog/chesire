(function() {
    'use strict';

    angular.module('chesireApp')
        .component('songPartsListHud', {
            bindings: {
                song: '='
            },
            controller: 'SongPartsListHudController as vm',
            templateUrl: 'scripts/song-selector/song-parts-list-hud/song-parts-list-hud.tpl.html'
        });
})();