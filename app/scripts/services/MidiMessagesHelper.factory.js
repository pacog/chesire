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

        var mainVolumeCode = function() {
            return 208 + DEFAULT_CHANNEL;
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

        var getMainVolume = function(volume) {
            var firstByte = mainVolumeCode();

            return [firstByte, parseInt(Math.floor(volume*128), 10), 0];
        };

        return {
            getNoteOn: getNoteOn,
            getNoteOff: getNoteOff,
            getKeyPressureChange: getKeyPressureChange,
            getAllNotesOff: getAllNotesOff,
            getMainVolume: getMainVolume
        };
    });