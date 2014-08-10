'use strict';

angular.module('chesireApp')
    .factory('MidiMessagesHelper', function() {

        var DEFAULT_CHANNEL = 0x00;

        var noteOnCode = function() {
            return 0x90 + DEFAULT_CHANNEL;
        };

        var noteOffCode = function() {
            return 0x80 + DEFAULT_CHANNEL;
        };

        var getNotesOn = function(notesInfo) {
            var firstByte = noteOnCode();
            var notesIds = getNotesIds(notesInfo);
            var notesVelocities = getNotesVelocities(notesInfo);

            return [firstByte].concat(notesIds).concat(notesVelocities);
        };

        var getNotesIds = function(notesInfo) {
            var result = [];

            for(var i=0; i<notesInfo.length; i++) {
                result.push(notesInfo[i].midi);
            }

            return result;
        };

        var getNotesVelocities = function(notesInfo) {
            var result = [];

            for(var i=0; i<notesInfo.length; i++) {
                result.push(Math.floor(notesInfo[i].gain*128));
            }

            return result;
        };

        var getNoteOff = function(noteInfo) {
            var firstByte = noteOffCode();

            return [firstByte, noteInfo.midi, 0];
        };

        return {
            getNotesOn: getNotesOn,
            getNoteOff: getNoteOff
        };
    });