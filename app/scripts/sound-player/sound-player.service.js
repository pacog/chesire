(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('soundPlayer', soundPlayer);

    function soundPlayer(SynthOptions, CurrentSynth) {
        var DEFAULT_TIME_FOR_NOTE = 1000; //ms
        var factory = {
            playNote: playNote
        };
        return factory;

        function playNote(note, duration) {
            duration = duration || DEFAULT_TIME_FOR_NOTE;
            
            SynthOptions.getSynthOptions().then(function(synthOptions) {
                if(synthOptions.outputMode === 'audio') {
                    var synth = CurrentSynth.getCurrentSynth();
                    synth.playNote(note, duration);
                } else if(synthOptions.outputMode === 'midi') {

                }
            });
        }
    }
})();
