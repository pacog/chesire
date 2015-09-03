'use strict';

angular.module('chesireApp')

.factory('MultiNotesHelper', function (SynthOptions, ScaleOptions, SynthOptionsHelper) {

    var notesInfo = null;
    var notesVolumeHash = null;
    var chordsInfo = null;
    var synthoptions = null;
    var scaleOptions = null;
    var FIRST_CHORD_X = 0.05;
    var LAST_CHORD_X = 0.95;


    var init = function() {
        SynthOptions.getSynthOptions().then(function(newSynthOptions) {
            synthoptions = newSynthOptions;
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
        });
        
        ScaleOptions.getScaleOptions().then(function(newScaleOptions) {
            scaleOptions = newScaleOptions;
            changeNotes(scaleOptions);
            ScaleOptions.subscribeToChangesInScaleOptions(scaleOptionsChanged);
        });
    };

    var synthOptionsChanged = function(newSynthOptions) {
        synthoptions = newSynthOptions;
        changeNotes(scaleOptions, synthoptions);
    };

    var scaleOptionsChanged = function(newScaleOptions) {
        scaleOptions = newScaleOptions;
        changeNotes(scaleOptions, synthoptions);
    };

    var silenceAllNotes = function() {

        angular.forEach(notesInfo, function(note) {
            note.gain = 0;
        });
    };

    var changeNotes = function(newNotes, newSynthOptions) {
        if(newNotes && newSynthOptions) {

            //Ugly conversion, sometimes synth options include all synth, sometimes only the oscillator
            var oscillatorComponent = newSynthOptions;
            if(!!newSynthOptions.components) {
                oscillatorComponent = SynthOptionsHelper.getOscillatorFromOptions(newSynthOptions);
            }

            notesInfo = [];
            chordsInfo = newNotes;
            if(oscillatorComponent.transitionType==='glissando') {
                createNotesForGlissandoTransition(newNotes);
            } else if(oscillatorComponent.transitionType==='volume') {
                createNotesForVolumeTransition(newNotes);
            }
            silenceAllNotes();
        }
    };

    var createNotesForGlissandoTransition = function(newNotes) {
        //TODO: order the two chords so 
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
        }
    };

    var createNotesForVolumeTransition = function(newNotes) {
        notesVolumeHash = {};
        var positionInNoteArray = 0;
        //We don't allow duplicated notes (thus avoiding problems with MIDI) So we only add one note of a kind
        angular.forEach(newNotes.chords, function(chord) {
            angular.forEach(chord.notes, function(note) {
                
                if(!angular.isNumber(notesVolumeHash[note.name])) {
                    notesVolumeHash[note.name] = positionInNoteArray;
                    notesInfo.push(note);
                    positionInNoteArray++;
                }
            });
        });
    };

    var snap = function(x, snapDistance) {
        if(x<snapDistance) {
            return 0;
        }
        if(x>=snapDistance && x < (1-snapDistance)) {
            return (x - snapDistance)/(1 - (2*snapDistance));
        }
        return 1;
    };

    var getNotesInfo = function(motionParams, oscillatorInfo) {
        var transitionType = oscillatorInfo.transitionType;
        var x = motionParams.x;

        var notesInfo = null;
        if(transitionType === 'glissando') {
            notesInfo = getNotesInfoWithGlissandoTransition(x);
        } else if(transitionType === 'volume') {
            notesInfo = getNotesInfoWithVolumeTransition(x);
        }
        if(oscillatorInfo.midiControlMode === 'pulsate') {

        }
        return notesInfo;
    };

    var getNotesDefinition = function(notes, synthConfig) {
        if(!notesInfo) {
            changeNotes(notes, synthConfig);
        }
        return notesInfo;
    };

    var getNotesInfoWithVolumeTransition = function(x) {
        var chordsInfo = getChordsInvolvedFromXPosition(x);
        var notesBeingPlayed = {};
        var indexOfNote;

        silenceAllNotes();

        for(var i=0; i<chordsInfo.firstChord.length; i++) {
            indexOfNote = notesVolumeHash[chordsInfo.firstChord[i].name];
            notesInfo[indexOfNote].freqToPlay = notesInfo[indexOfNote].freq;
            notesInfo[indexOfNote].gain = 1 - chordsInfo.distanceInBetween;
            notesBeingPlayed[chordsInfo.firstChord[i].name] = true;
        }
        for(i=0; i<chordsInfo.secondChord.length; i++) {
            indexOfNote = notesVolumeHash[chordsInfo.secondChord[i].name];
            notesInfo[indexOfNote].freqToPlay = notesInfo[indexOfNote].freq;
            //If the same note is in two chords, it won't fade in/out
            if(notesBeingPlayed[chordsInfo.secondChord[i].name]) {
                notesInfo[indexOfNote].gain = 1;
            } else {
                notesInfo[indexOfNote].gain = chordsInfo.distanceInBetween;
            }
        }
        normalizeTotalGainOfNotes(notesInfo);

        return notesInfo;
    };

    var getChordsInvolvedFromXPosition = function(x) {
        var positionRelativeToNotes = getPositionRelativeToNotes(x, chordsInfo.chords.length);
        var firstNote = Math.floor(positionRelativeToNotes);
        if(firstNote >= (chordsInfo.chords.length - 1)) {
            firstNote = firstNote-1;
        }
        var distanceInBetween = positionRelativeToNotes - firstNote;
        var oscillatorOptions = SynthOptionsHelper.getOscillatorFromOptions(synthoptions);
        distanceInBetween = snap(distanceInBetween, oscillatorOptions.snapDistance);
        silenceAllNotes();

        var firstChord = chordsInfo.chords[firstNote].notes;
        var secondChord = chordsInfo.chords[firstNote + 1].notes;

        return {
            firstChord: firstChord,
            secondChord: secondChord,
            distanceInBetween: distanceInBetween
        };
    };

    var normalizeTotalGainOfNotes = function(notes) {
        var totalGain = 0;
        for(var i=0; i< notes.length; i++) {
            totalGain += notes[i].gain;
        }
        if(totalGain>0) {
            for(i=0; i< notes.length; i++) {
                notes[i].unnormalizedGain = notes[i].gain;
                notes[i].gain = notes[i].gain/totalGain;
            }
        }
    };

    var getNotesInfoWithGlissandoTransition = function(x) {
        var chordsInfo = getChordsInvolvedFromXPosition(x);
        var freq1, freq2;

        silenceAllNotes();

        for(var i=0; i<notesInfo.length; i++) {

            if(chordsInfo.firstChord[i] && chordsInfo.firstChord[i].freq && chordsInfo.secondChord[i] && chordsInfo.secondChord[i].freq) {

                freq1 = chordsInfo.firstChord[i].freq;
                freq2 = chordsInfo.secondChord[i].freq;
                notesInfo[i].freqToPlay = freq1 + (freq2-freq1)*chordsInfo.distanceInBetween;
                notesInfo[i].gain = 1;
            } else if(chordsInfo.firstChord[i] && chordsInfo.firstChord[i].freq) {

                notesInfo[i].gain = 1-chordsInfo.distanceInBetween;
                notesInfo[i].freqToPlay = chordsInfo.firstChord[i].freq;
            } else if(chordsInfo.secondChord[i] && chordsInfo.secondChord[i].freq) {

                notesInfo[i].gain = chordsInfo.distanceInBetween;
                notesInfo[i].freqToPlay = chordsInfo.secondChord[i].freq;
            } else {

                notesInfo[i].gain = 0;
            }
        }

        normalizeTotalGainOfNotes(notesInfo);

        return notesInfo;
    };

    var getPositionRelativeToNotes = function(x, numberOfNotes) {
        var result;

        if(x <= FIRST_CHORD_X) {
            result = 0;
        } else if(x >= LAST_CHORD_X) {
            result = numberOfNotes - 1;
        } else {
            result = (numberOfNotes - 1)*(x - FIRST_CHORD_X)/(LAST_CHORD_X - FIRST_CHORD_X);
        }

        return result;
    };

    var getChordsRelevanceFromX = function(x) {
        var positionRelativeToNotes = getPositionRelativeToNotes(x, chordsInfo.chords.length);
        var firstNote = Math.floor(positionRelativeToNotes);
        if(firstNote >= (chordsInfo.chords.length - 1)) {
            firstNote = firstNote-1;
        }
        var distanceInBetween = positionRelativeToNotes - firstNote;
        var oscillatorOptions = SynthOptionsHelper.getOscillatorFromOptions(synthoptions);
        distanceInBetween = snap(distanceInBetween, oscillatorOptions.snapDistance);

        var result = [];
        for(var i=0; i<chordsInfo.chords.length; i++) {
            var chordValue = 0;
            if(i===firstNote) {
                chordValue = 1-distanceInBetween;
            } else if(i===(firstNote+1)) {
                chordValue = distanceInBetween;
            }
            result.push(chordValue);
        }

        return result;
    };

    var getChordsPosition = function() {
        var result = [];

        if(chordsInfo.chords.length > 1) {
            var eachChordSize = (LAST_CHORD_X - FIRST_CHORD_X)/(chordsInfo.chords.length - 1);
            for(var i=0; i<chordsInfo.chords.length; i++) {
                result.push({
                    middle: eachChordSize*i + FIRST_CHORD_X
                });
            }
        }

        return result;
    };

    init();

    return {
        changeNotes: changeNotes,
        getNotesInfo: getNotesInfo,
        getNotesDefinition: getNotesDefinition,
        getChordsRelevanceFromX: getChordsRelevanceFromX,
        getChordsPosition: getChordsPosition
    };
});
