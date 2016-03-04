(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongPartEditorController', SongPartEditorController);

    function SongPartEditorController($scope, chordNames, ScaleOptions, chordSelector, songEditor, chordEditor, songScaleCreator) {
        var CHORDS_TWO_ROWS_LIMIT = 5;
        var vm = this;

        vm.currentPart = null;
        vm.currentSong = null;

        vm.getChordName = getChordName;
        vm.isChordInSecondRow = isChordInSecondRow;
        vm.pickChord = pickChord;
        vm.removeChord = removeChord;
        vm.addChordBefore = addChordBefore;
        vm.addChordLast = addChordLast;
        vm.partNameChanged = partNameChanged;
        vm.createPartFromScale = createPartFromScale;
        vm.editChord = editChord;
        vm.deletePart = deletePart;
        vm.duplicatePart = duplicatePart;

        init();

        function init() {
            ScaleOptions.subscribeToChangesInScaleOptions(onSongChange);
            $scope.$on('$destroy', onDestroy);
        }

        function onSongChange(newSong) {
            vm.currentSong = newSong;
            if(newSong) {
                if(vm.currentPart !== newSong.getCurrentPart()) {
                    vm.currentPart = newSong.getCurrentPart();
                }
            }
        }

        function partNameChanged() {
            //TODO: maybe just for a change of name we shouldn't rebuild stuff
            songEditor.notifySongHasChanged(true);
        }

        //TODO: create chord model, do it there
        function getChordName(chord) {
            return chordNames.getChordName(chord);
        }

        function isChordInSecondRow($index) {
            return ((vm.currentPart.chords.length > CHORDS_TWO_ROWS_LIMIT) && ($index%2)===1);
        }

        function pickChord(index, chords) {
            chordSelector.showSelector().then(function(chordChosen) {
                chords[index] = chordChosen;
                songEditor.notifySongHasChanged(true);
            });
        }

        function removeChord(index, chords) {
            //TODO: do in song model
            if(chords.length > 2) {
                chords.splice(index, 1);
            } else {
                chords[index].notes = [];
                chords[index].name = undefined;
            }
            songEditor.notifySongHasChanged(true);
        }

        function deletePart() {
            vm.confirmingDelete = false;
            if(vm.currentSong.deletePart(vm.currentPart)) {
                songEditor.notifySongHasChanged(true);
            }
        }

        function duplicatePart() {
            if(vm.currentSong.duplicatePart(vm.currentPart)) {
                songEditor.notifySongHasChanged(true);
            }
        }

        function addChordBefore(index) {
            //TODO: do in song model
            vm.currentPart.chords.splice(index, 0, getEmptyChord());
            songEditor.notifySongHasChanged(true);
        }

        function addChordLast() {
            //TODO: do in song model
            vm.currentPart.chords.push(getEmptyChord());
            songEditor.notifySongHasChanged(true);
        }

        function editChord(index, chords) {
            chordEditor.showEditor(chords[index]).then(function(newChord) {
                chords[index] = newChord;
                songEditor.notifySongHasChanged(true);
            });
        }

        function createPartFromScale() {
            songScaleCreator.show().then(partCreatedFromScale);
        }

        function partCreatedFromScale() {
            songEditor.notifySongHasChanged(true);
        }

        //TODO: do in chord model
        function getEmptyChord() {
            return {
                name: undefined,
                notes: []
            };
        }

        function onDestroy() {
            ScaleOptions.unsubscribeToChangesInScaleOptions(onSongChange);
        }
    }

})();