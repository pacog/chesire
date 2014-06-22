'use strict';

angular.module('chesireApp')

.controller('SoundgeneratorCtrl', function ($scope, $timeout, Leapmotion, SynthClass, MultiNotesHelper, ScaleOptions, SynthOptions) {

    var synthOptions = null;
    var currentSynth = new SynthClass();

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
        if(newValue) {
            currentSynth.scaleChanged(newValue);
        } else {
            //TODO: check if we need the if
            console.log('notesChanged with no value');
        }
    };

    var synthOptionsChanged = function(newOptions) {
        synthOptions = newOptions;
        currentSynth.destroy();
        currentSynth = new SynthClass(newOptions);
    };

    var frameInfoChanged = function(frame) {
        //TODO: refactor this so the checking for hands comes from Synth
        //At least check if there are 2 hands to send the current one
        var newFrame = frame.frame;
        if(newFrame) {
            if(newFrame.hands.length) {
                var motionParams = Leapmotion.getRelativePositions(newFrame, newFrame.hands);
                currentSynth.updateSound(newFrame.hands[0], motionParams);
            } else {
                currentSynth.stopPlaying();
            }
        } else {
            // TODO check if we need the check for new frame
            console.log('frameInfoChanged, no frame info');
        }
    };

    init();
 });
