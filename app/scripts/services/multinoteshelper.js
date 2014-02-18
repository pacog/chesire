'use strict';

angular.module('chesireApp')

.factory('MultiNotesHelper', function () {

    var notesInfo = null;

    var silenceAllNotes = function() {

        angular.forEach(notesInfo, function(chord) {
            angular.forEach(chord, function(note) {
                note.gain = 0;
            });
        });
    };

    var changeNotes = function(newNotes) {
        
        notesInfo = [];
        angular.forEach(newNotes.chords, function(chord, chordIndex) {
            notesInfo.push([]);
            angular.forEach(chord.notes, function(note) {
                notesInfo[chordIndex].push(note);
            });
        });
        silenceAllNotes();
    };

    var getNotesInfo = function(x, synthoptions) {

        var positionRelativeToNotes = getPositionRelativeToNotes(x, notesInfo.length);

        var firstNote = Math.floor(positionRelativeToNotes);
        if(firstNote >= (notesInfo.length - 1)) {
            firstNote = firstNote-1;
        }
        var distanceInBetween = positionRelativeToNotes - firstNote;
        distanceInBetween = synthoptions.snap(distanceInBetween);
        silenceAllNotes();

        //TODO option to make all chords sound with same volume, even if they have different number of notes
        var firstChord = notesInfo[firstNote];
        var secondChord = notesInfo[firstNote + 1];
        var biggestChord = firstChord;
        var smallerChord = secondChord;
        var i=0;
        var freq1, freq2;

        if(secondChord.length > firstChord.length) {
            biggestChord = secondChord;
            smallerChord = firstChord;
        }

        for(i=0; i<smallerChord.length; i++) {

            freq1 = firstChord[i].freq;
            freq2 = secondChord[i].freq;
            firstChord[i].freqToPlay = freq1 + (freq2-freq1)*distanceInBetween;
            firstChord[i].gain = 1;
        }

        //Notes that do not have a sibling in the next chord get change in gain
        for(i; i<firstChord.length; i++) {
            firstChord[i].gain = 1-distanceInBetween;
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
