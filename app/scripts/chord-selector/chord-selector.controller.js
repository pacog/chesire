(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ChordSelectorController', ChordSelectorController);

    function ChordSelectorController(chordSelector, startingNotes, chordMoods) {
        var vm = this;

        vm.chordSelector = chordSelector;

        vm.close = closeModal;
        vm.save = save;

        init();

        function init() {
            vm.startingNotes = startingNotes.get();
            vm.startingNote = vm.startingNotes[0].value;
            vm.moods = chordMoods;
            vm.mood = vm.moods[0].value;
            vm.numberOfNotes = 6;
        }

        function save() {
            var chord = chordSelector.getChordFromParams(vm.startingNote, vm.mood, vm.numberOfNotes);
            chordSelector.notifyChordSelected(chord);
            closeModal();
        }

        function closeModal() {
            chordSelector.close();
        }
    }

})();