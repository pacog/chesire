(function() {
    'use strict';


    angular.module('chesireApp')

        .component('songPartsListEditor', {
            bindings: {
                'song': '='
            },
            controller: 'SongPartsListEditor as vm',
            templateUrl: 'scripts/song-selector/song-parts-list-editor/song-parts-list-editor.tpl.html'
        });


})();