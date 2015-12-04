(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SongScaleCreatorController', SongScaleCreatorController);

    function SongScaleCreatorController(songScaleCreator, NoteList, defaultScales, ScaleOptions) {
        var vm = this;

        vm.songScaleCreator = songScaleCreator;

        vm.close = songScaleCreator.hide;
        vm.save = save;

        init();

        function init() {
            vm.startingNotes = getStartingNotes();
            vm.startingNote = vm.startingNotes[0].value;
            vm.scales = defaultScales;
            vm.scale = defaultScales[0].value;
            vm.repetitions = 1;
        }

        function save() {
            var song = getSongfromParams();
            ScaleOptions.setScaleOptions(song);
            vm.close();
        }

        function getStartingNotes() {
            var a220Index = _.findIndex(NoteList, function(note) {
                return note.freq === 220;
            });
            var notes = NoteList.slice(a220Index, a220Index + 12);
            return _.map(notes, function(note) {
                return {
                    'name': note.name,
                    'value': note
                };
            });

        }

        function getSongfromParams() {
            //TODO this should be in a service, not controller
            var song = {
                name: 'from scale',
                chords: []
            };

            var startingNote = _.findIndex(NoteList, function(note) {
                return note.freq === vm.startingNote.freq;
            });
            var currentStepInInterval = 0;

            var notesPerRepetition = 0;
            for(var j=0; j<vm.scale.intervals.length; j++) {
                if(vm.scale.intervals[j]) {
                    notesPerRepetition++;
                }
            }

            for(var i=startingNote; (i<NoteList.length) && (song.chords.length < (vm.repetitions*notesPerRepetition)); i++) {
                if(vm.scale.intervals[currentStepInInterval]) {
                    song.chords.push({
                        name: '',
                        notes: [angular.copy(NoteList[i])]
                    });
                }
                currentStepInInterval ++;
                if(currentStepInInterval >= vm.scale.intervals.length) {
                    currentStepInInterval = 0;
                }
            }

            return song;
        }
    }

})();