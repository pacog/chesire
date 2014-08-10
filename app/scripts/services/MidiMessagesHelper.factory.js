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

        var keyPressureCode = function() {
            return 0xA0 + DEFAULT_CHANNEL;
        };

        var getNoteOn = function(noteInfo) {
            var firstByte = noteOnCode();
            return [firstByte, noteInfo.midi, parseInt(Math.floor(noteInfo.gain*128), 10)];
        };

        var getKeyPressureChange = function(noteInfo) {
            var firstByte = keyPressureCode();

            return [firstByte, noteInfo.midi, parseInt(Math.floor(noteInfo.gain*128), 10)];
        };

        var getNoteOff = function(noteInfo) {
            var firstByte = noteOffCode();

            return [firstByte, noteInfo.midi, 0];
        };

        var getAllNotesOff = function() {
            return [0x7B];
        };

        return {
            getNoteOn: getNoteOn,
            getNoteOff: getNoteOff,
            getKeyPressureChange: getKeyPressureChange,
            getAllNotesOff: getAllNotesOff
        };
    });