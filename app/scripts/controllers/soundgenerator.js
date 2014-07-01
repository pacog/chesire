'use strict';

angular.module('chesireApp')

.controller('SoundgeneratorCtrl', function ($scope, $timeout, Leapmotion, SynthClass, MultiNotesHelper, ScaleOptions, SynthOptions, CurrentSynth) {

    var synthOptions = null;
    var currentSynth = new SynthClass();
    CurrentSynth.setCurrentSynth(currentSynth);

    var init = function() {
        Leapmotion.subscribeToFrameChange(frameInfoChanged);

        SynthOptions.getSynthOptions().then(function(newSynthOptions) {
            synthOptions = newSynthOptions;
            synthOptionsChanged(newSynthOptions);
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
        });

        ScaleOptions.getScaleOptions().then(function(scaleOptions) {
            notesChanged(scaleOptions);
            ScaleOptions.subscribeToChangesInScaleOptions(notesChanged);
        });
    };

    var notesChanged = function(newValue) {
        currentSynth.scaleChanged(newValue);
    };

    var synthOptionsChanged = function(newOptions) {
        synthOptions = newOptions;
        currentSynth.destroy();
        currentSynth = new SynthClass(newOptions);
        CurrentSynth.setCurrentSynth(currentSynth);
    };

    var frameInfoChanged = function(frame) {
        //TODO: refactor this so the checking for hands comes from Synth
        //At least check if there are 2 hands to send the current one
        var newFrame = frame.frame;
        if(newFrame.hands.length) {
            var motionParams = Leapmotion.getRelativePositions(newFrame, newFrame.hands);
            currentSynth.updateSound(newFrame.hands[0], motionParams);
        } else {
            currentSynth.stopPlaying();
        }
    };

    init();
 });
