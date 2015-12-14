(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ChordEditorController', ChordEditorController);

    function ChordEditorController(chordEditor) {
        var vm = this;

        vm.chordEditor = chordEditor;
        vm.close = closeModal;
        vm.save = save;

        function closeModal() {
            chordEditor.close();
        }

        function save() {
            chordEditor.notifyChordEdited(chordEditor.chord);
            chordEditor.close();
        }

    }

})();