(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('NotesKeyboardController', NotesKeyboardController);

    function NotesKeyboardController($scope, NoteList) {
        var vm = this;

        var allNotesStatus = [];
        var notesHash = {};

        vm.allNotes = NoteList;
        vm.isNoteSelected = isNoteSelected;
        vm.selectNote = selectNote;
        vm.isNotePossible = isNotePossible;

        init();

        function init() {
            $scope.$watch('vm.notes', notesChanged);
        }

        function notesChanged(newNotes) {
            if(newNotes) {
                rebuildNotesHash(newNotes);
                updateNotesStatus(newNotes);
            }
        }

        function isNoteSelected(index) {
            return allNotesStatus[index] === 'selected';
        }

        function isNotePossible(index) {
            return allNotesStatus[index] === 'possible';
        }

        function selectNote(note) {
            if(notesHash[note.name]) {
                removeNote(note);
            } else {
                vm.notes.push(note);
                vm.notes = angular.copy(vm.notes);
            }
        }

        function removeNote(noteToRemove) {
            var noteIndex = _.findIndex(vm.notes, function(note) {
                return note.name === noteToRemove.name;
            });
            vm.notes.splice(noteIndex, 1);
            vm.notes = angular.copy(vm.notes);
        }

            
        function rebuildNotesHash(newNotes) {
            notesHash = {};
            newNotes.forEach(addNoteToHash);
        }

        function addNoteToHash(note) {
            notesHash[note.name] = {
                selected: true,
                index: getNoteIndex(note)
            };
        }

        function updateNotesStatus(newNotes) {
            allNotesStatus = Array.apply(null, new Array(NoteList.length)).map(Number.prototype.valueOf,0);
            newNotes.forEach(updateNotesInfoForNote);
        }

        function updateNotesInfoForNote(note) {
            var noteInHash = notesHash[note.name];
            var noteIndex = noteInHash.index;
            allNotesStatus[noteIndex] = 'selected';
            var startingIndex = noteIndex%12;
            for(var i=startingIndex; i<allNotesStatus.length; i += 12) {
                if(allNotesStatus[i] !== 'selected') {
                    allNotesStatus[i] = 'possible';
                }
            }
        }

        function getNoteIndex(noteToFind) {
            return _.findIndex(NoteList, function(note) {
                return note.name === noteToFind.name;
            });

        }
    }

})();