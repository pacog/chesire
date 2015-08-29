'use strict';

angular.module('chesireApp')

    .factory('MidiApiMediator', function($q, MidiAccess) {

        var factoryWillBeReady = $q.defer();

        var init = function() {
            if (navigator.requestMIDIAccess) {
                navigator.requestMIDIAccess({
                    sysex: false // TODO: try to support it
                }).then(function(nativeMidiAccess) {
                    factoryWillBeReady.resolve(new MidiAccess(nativeMidiAccess));
                }, throwNoMidiSupportError);
            } else {
                throwNoMidiSupportError();
            }
        };

        var throwNoMidiSupportError = function() {
            throw ('No MIDI support in your browser.');
        };

        init();

        return factoryWillBeReady.promise;
    })

    .factory('MidiAccess', function(MidiOutput) {

        var MidiAccessClass = function(nativeMidiAccess) {
            if(!nativeMidiAccess) {
                throw 'Error creating MidiAccess object: we need the JazzMidi object';
            }
            this.nativeMidiAccess = nativeMidiAccess;
        };

        MidiAccessClass.prototype.outputs = function() {

            var outputs = [];

            for (var output of this.nativeMidiAccess.outputs.values()) {
                outputs.push(new MidiOutput(this, output));
            }

            return outputs;
        };

        return MidiAccessClass;
    })

    .service('MidiOutput', function(MidiMessagesHelper) {

        var outputDevice = null;

        var MidiOutput = function ( nativeMidiAccess, outputDeviceReceived) {
            this.id = outputDeviceReceived.id;
            this.name = outputDeviceReceived.name;
            outputDevice = outputDeviceReceived;
        };

        var send = function( data ) {
            outputDevice.send(data);
            // jazzObject.MidiOutLong( data );
        };

        MidiOutput.prototype.send = send;

        MidiOutput.prototype.notesOff = function (notesOff) {
            angular.forEach(notesOff, function(note) {
                if(note) {
                    send(MidiMessagesHelper.getNoteOff(note));
                }
            });
        };

        MidiOutput.prototype.notesOn = function (notesOn) {
            angular.forEach(notesOn, function(note) {
                send(MidiMessagesHelper.getNoteOn(note));
            });
        };

        MidiOutput.prototype.keyPressureChanges = function (notesUpdate) {
            angular.forEach(notesUpdate, function(note) {
                send(MidiMessagesHelper.getKeyPressureChange(note));
            });
        };

        MidiOutput.prototype.allOff = function(notes) {

            angular.forEach(notes, function(note) {
                if(note) {
                    send(MidiMessagesHelper.getNoteOff(note));
                }
            });
            //send(MidiMessagesHelper.getAllNotesOff());
        };

        MidiOutput.prototype.updateMainVolume = function(volume) {
            send(MidiMessagesHelper.getMainVolume(volume));
        };

        MidiOutput.prototype.updateControl = function(controlInfo, controlValue) {
            send(MidiMessagesHelper.getControl(controlInfo, controlValue));
        };

        MidiOutput.prototype.resetEverything = function() {
            send(MidiMessagesHelper.getResetControls());
            send(MidiMessagesHelper.getResetNotes());
        };

        MidiOutput.prototype.pingControl = function(controlNumber) {
            send(MidiMessagesHelper.getPingControl(controlNumber));
        };

        return MidiOutput;
    })
    ;