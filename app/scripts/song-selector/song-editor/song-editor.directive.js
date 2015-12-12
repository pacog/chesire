(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('songEditor', songEditor);

    function songEditor() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/song-selector/song-editor/song-editor.tpl.html',
            scope: {
                song: '='
            },
            controller: 'SongEditorController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();