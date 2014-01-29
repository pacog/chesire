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

    /**
     * Starts playing the synth
     * @param {Number} frequency new frequency in Hz
     * @param {Number} gain Gain, from 0 to 1
     */
    var startPlaying = function(frequency, gain) {

        changePlayingFrequency(frequency);
        changeGain(gain);

    };

    /**
     * Changes the frequency that the synth is playing
     * @param {Number} frequency new frequency in Hz
     */
    var changePlayingFrequency = function(frequency) {

        oscillator.frequency.value = frequency;
    };

    /**
     * Stops playing the synth
     */
    var stopPlaying = function() {

        changeGain(0);
    };

    init();

    return {
        changeGain:             changeGain,
        startPlaying:           startPlaying,
        changePlayingFrequency: changePlayingFrequency,
        stopPlaying:            stopPlaying
    };
});
