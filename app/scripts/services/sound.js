'use strict';

angular.module('chesireApp')

.factory('Sound', function (Audiocontext) {

    var audioContext;
    var oscillator;
    var vibratoOscillator;
    var gainController;
    var vibratoGainController;

    var init = function() {

        audioContext = new Audiocontext();

        oscillator = audioContext.createOscillator();
        oscillator.type = oscillator.SINE;

        gainController = audioContext.createGainNode();
        oscillator.connect(gainController);
        gainController.connect(audioContext.destination);

        vibratoOscillator = audioContext.createOscillator();
        //vibratoOscillator.type = vibratoOscillator.SINE;
        vibratoOscillator.frequency.value = 10;
        vibratoGainController = audioContext.createGain();
        vibratoGainController.gain.value = 0.5;
        vibratoOscillator.connect(vibratoGainController);
        vibratoGainController.connect(gainController.gain);
         vibratoOscillator.noteOn(0);

        changeGain(0);
        oscillator.noteOn(0);
    };

    /**
     * Changes the gain of the oscillator
     * @param  {Number} gain New gain, from 0 to 1
     */
    var changeGain = function(gain) {

        gainController.gain.value = gain;
        if(gain === 0) {
            vibratoGainController.gain.value = gain;
        }
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

    var changeOscillatorType = function(newType) {

        oscillator.type = newType;
    };

    var changeVibrato = function(newVibrato) {
        vibratoGainController.gain.value = newVibrato;
    };

    init();

    return {
        changeGain:             changeGain,
        startPlaying:           startPlaying,
        changePlayingFrequency: changePlayingFrequency,
        changeVibrato:          changeVibrato,
        stopPlaying:            stopPlaying,
        changeOscillatorType:   changeOscillatorType
    };
});
