(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('chordEditor', chordEditor);

    function chordEditor() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/chord-editor/chord-editor.tpl.html',
            scope: {},
            controller: 'ChordEditorController',
            controllerAs: 'vm'
        };
    }

})();