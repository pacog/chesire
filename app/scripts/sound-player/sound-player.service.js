(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('soundPlayer', soundPlayer);

    function soundPlayer($timeout, SynthOptions, CurrentSynth, CurrentMidiOutput) {
        var DEFAULT_TIME_FOR_NOTE = 1000; //ms
        var factory = {
            playNote: playNote
        };
        return factory;

        function playNote(note, duration) {
            duration = duration || DEFAULT_TIME_FOR_NOTE;
            
            SynthOptions.getSynthOptions().then(function(synthOptions) {
                if(synthOptions.isAudioOutput()) {
                    var synth = CurrentSynth.getCurrentSynth();
                    synth.playNote(note, duration);
                } else if(synthOptions.isMidiOutput()) {
                    var noteToSend = angular.extend({}, note, {unnormalizedGain: 1});
                    CurrentMidiOutput.getCurrentOutput().notesOn([noteToSend]);
                    $timeout(function() {
                        CurrentMidiOutput.getCurrentOutput().notesOff([noteToSend]);
                    }, duration);
                }
            });
        }
    }
})();
