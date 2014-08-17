'use strict';

angular.module('chesireApp')
    .factory('MidiMessagesHelper', function() {

        var DEFAULT_CHANNEL = 0;

        var noteOnCode = function() {
            return 144 + DEFAULT_CHANNEL;
        };

        var noteOffCode = function() {
            return 128 + DEFAULT_CHANNEL;
        };

        var keyPressureCode = function() {
            return 160 + DEFAULT_CHANNEL;
        };

        // var mainVolumeCode = function() {
        //     return 208 + DEFAULT_CHANNEL;
        // };

        var controlCode = function() {
            return 176 + DEFAULT_CHANNEL;
        };

        var getNoteOn = function(noteInfo) {
            var firstByte = noteOnCode();
            var noteOnVelocity = parseInt(Math.floor(noteInfo.unnormalizedGain*127), 10);
            if(noteOnVelocity <= 0) {
                noteOnVelocity = 1;
            }
            return [firstByte, noteInfo.midi, noteOnVelocity];
        };

        var getKeyPressureChange = function(noteInfo) {
            var firstByte = keyPressureCode();

            return [firstByte, noteInfo.midi, parseInt(Math.floor(noteInfo.unnormalizedGain*127), 10)];
        };

        var getNoteOff = function(noteInfo) {
            var firstByte = noteOffCode();

            return [firstByte, noteInfo.midi, 0];
        };

        var getAllNotesOff = function() {
            return [0x7B];
        };

        var getMainVolume = function(volume) {
            // var firstByte = mainVolumeCode();
            var firstByte = controlCode();
            return [firstByte, 7, parseInt(Math.floor(volume*127), 10)];
        };

        var getNoteTune = function(note) {
            var tt = 0;
            var ll = 1;
            var kk = note.midi;
            var xx = 45;
            var yy = 50;
            var zz = 50;
            return [0xF0, 0x7F, 0x00, 0x08, 0x02, tt, ll, kk, xx, yy, zz, 0xF7];
        };

        var getControl = function() {
            return [176 + DEFAULT_CHANNEL, 7, 30];
        };

        return {
            getNoteOn: getNoteOn,
            getNoteOff: getNoteOff,
            getKeyPressureChange: getKeyPressureChange,
            getAllNotesOff: getAllNotesOff,
            getMainVolume: getMainVolume,
            getNoteTune: getNoteTune,
            getControl: getControl
        };
    });