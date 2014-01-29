'use strict';

angular.module('chesireApp')

.factory('Sound', function () {

    var audioContext;
    var oscillator;
    var gainController;

    var init = function() {

        // Fix up for prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new window.AudioContext();
        oscillator = audioContext.createOscillator();
        oscillator.type = oscillator.SINE;
        gainController = audioContext.createGainNode();
        oscillator.connect(gainController);
        gainController.connect(audioContext.destination);
        changeGain(0);
        oscillator.noteOn(0);
    };

    /**
     * Changes the gain of the oscillator
     * @param  {Number} gain New gain, from 0 to 1
     */
    var changeGain = function(gain) {

        gainController.gain.value = gain;
    };


    init();

    return {
        
    };
});
