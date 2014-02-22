'use strict';

angular.module('chesireApp')

.factory('Scales', function (Notes) {

    var notes = Notes;

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

    return {
        getAllNotes: function () {
            return notes;
        },
        isSameChord: isSameChord
    };
});
