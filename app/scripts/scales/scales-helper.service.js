'use strict';

angular.module('chesireApp')

.factory('ScalesHelper', function (NoteList) {

    var notes = NoteList;

    var isSameChord = function(chord1, chord2) {

        var result = true;
        var chord1Hash = {};
        var chord2Hash = {};
        angular.forEach(chord1.notes, function(note) {
            chord1Hash[note.name] = true;
        });
        angular.forEach(chord2.notes, function(note) {
            chord2Hash[note.name] = true;
        });
        angular.forEach(chord1Hash, function(noteValue, noteName) {
            if(!chord2Hash[noteName]) {
                result = false;
                return false;
            }
        });
        angular.forEach(chord2Hash, function(noteValue, noteName) {
            if(!chord1Hash[noteName]) {
                result = false;
                return false;
            }
        });
        return result;
    };

    var isSameSetOfChords = function(set1, set2) {

        if(!set1 || !set2) {
            return false;
        }

        var result = true;

        if(set1.length === set2.length) {
            for(var i=0; i<set1.length; i++) {
                if(!isSameChord(set1[i], set2[i])) {
                    result = false;
                    break;
                }
            }
        } else {
            result = false;
        }

        return result;
    };

    var getEmptyChord = function() {
        return {
            name: 'No name',
            notes: []
        };
    };

    return {
        getAllNotes: function () {
            return notes;
        },
        isSameChord: isSameChord,
        isSameSetOfChords: isSameSetOfChords,
        getEmptyChord: getEmptyChord
    };
});
