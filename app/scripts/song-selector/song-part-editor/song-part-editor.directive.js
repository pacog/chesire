(function() {
    'use strict';

    angular.module('chesireApp')
        .component('songPartEditor', {
            bindings: {},
            controller: 'SongPartEditorController as vm',
            templateUrl: 'scripts/song-selector/song-part-editor/song-part-editor.tpl.html'
        });
})();