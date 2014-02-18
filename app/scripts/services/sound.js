'use strict';

angular.module('chesireApp')

.factory('Sound', function (Audiocontext, OscillatorCollection) {

    var audioContext;
    var oscillatorCollection;
    var vibratoOscillator;
    var gainController;
    var vibratoGainController;

    var init = function() {

        audioContext = new Audiocontext();
        oscillatorCollection = new OscillatorCollection(audioContext, null);

        gainController = audioContext.createGainNode();
        oscillatorCollection.connect(gainController);
        gainController.connect(audioContext.destination);

        vibratoOscillator = audioContext.createOscillator();
        //vibratoOscillator.type = vibratoOscillator.SINE;
        vibratoOscillator.frequency.value = 10;
        vibratoGainController = audioContext.createGain();
        vibratoGainController.gain.value = 0.5;
        vibratoOscillator.connect(vibratoGainController);
        vibratoGainController.connect(gainController.gain);
        vibratoOscillator.noteOn(0);
    };

    var changeScale = function(newScale) {

        oscillatorCollection.destroy();
        oscillatorCollection.init(audioContext, newScale);
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

    //TODO: change name
    var changePlayingFrequency = function(frequency) {

        oscillatorCollection.updateNodes(frequency);
    };

    /**
     * Stops playing the synth
     */
    var stopPlaying = function() {

        changeGain(0);
    };

    var changeOscillatorType = function(newType) {

        oscillatorCollection.changeOscillatorType(newType);
    };

    var changeVibratoGain = function(newGain) {
        vibratoGainController.gain.value = newGain;
    };

    var changeVibratoFreq = function(newFreq) {
        vibratoOscillator.frequency.value = newFreq;
    };

    init();

    return {
        changeGain:             changeGain,
        changePlayingFrequency: changePlayingFrequency,
        changeVibratoGain:      changeVibratoGain,
        changeVibratoFreq:      changeVibratoFreq,
        stopPlaying:            stopPlaying,
        changeOscillatorType:   changeOscillatorType,
        changeScale:            changeScale
    };
});
