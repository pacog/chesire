'use strict';

angular.module('chesireApp')

.factory('MultiNotesHelper', function () {

    var notesInfo = null;
    var chordsInfo = null;

    var silenceAllNotes = function() {

        angular.forEach(notesInfo, function(note) {
            note.gain = 0;
        });
    };

    var changeNotes = function(newNotes) {

        notesInfo = [];
        chordsInfo = newNotes;
        var longerChord = 0;
        var longerChordIndex = false;
        angular.forEach(newNotes.chords, function(chord, chordIndex) {
            if(longerChord<chord.notes.length) {
                longerChord = chord.notes.length;
                longerChordIndex = chordIndex;
            }
        });
        for(var i=0; i<longerChord; i++) {
            notesInfo.push(newNotes.chords[longerChordIndex].notes[i]);
            notesInfo[i].gain = 0;
        }
        silenceAllNotes();
    };

    var getNotesInfo = function(x, synthoptions) {

        var positionRelativeToNotes = getPositionRelativeToNotes(x, chordsInfo.chords.length);

        var firstNote = Math.floor(positionRelativeToNotes);
        if(firstNote >= (chordsInfo.chords.length - 1)) {
            firstNote = firstNote-1;
        }
        var distanceInBetween = positionRelativeToNotes - firstNote;
        distanceInBetween = synthoptions.snap(distanceInBetween);
        silenceAllNotes();

        //TODO option to make all chords sound with same volume, even if they have different number of notes
        var firstChord = chordsInfo.chords[firstNote].notes;
        var secondChord = chordsInfo.chords[firstNote + 1].notes;
        var freq1, freq2;

        for(var i=0; i<notesInfo.length; i++) {

            if(firstChord[i].freq && secondChord[i].freq) {

                freq1 = firstChord[i].freq;
                freq2 = secondChord[i].freq;
                notesInfo[i].freqToPlay = freq1 + (freq2-freq1)*distanceInBetween;
                notesInfo[i].gain = 1;
            } else if(firstChord[i].freq) {

                notesInfo[i].gain = 1-distanceInBetween;
                notesInfo[i].freqToPlay = firstChord[i].freq;
            } else if(secondChord[i].freq) {

                notesInfo[i].gain = distanceInBetween;
                notesInfo[i].freqToPlay = secondChord[i].freq;
            } else {

                notesInfo[i].gain = 0;
            }
        }

        return notesInfo;
    };

    var getPositionRelativeToNotes = function(x, numberOfNotes) {

        var positionRelativeToNotes = x*(numberOfNotes -1);

        if(positionRelativeToNotes <0) {
            positionRelativeToNotes = 0;
        }
        if(positionRelativeToNotes > (numberOfNotes - 1)) {

            positionRelativeToNotes = numberOfNotes - 1;
        }

        return positionRelativeToNotes;
    };

    return {
        changeNotes: changeNotes,
        getNotesInfo: getNotesInfo
    };
});
