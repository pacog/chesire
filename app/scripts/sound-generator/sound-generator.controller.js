'use strict';

angular.module('chesireApp')
//TODO: this shouldn't be a controller, but a service init in app.js
.controller('SoundgeneratorCtrl', function ($scope, $timeout, $q, Leapmotion, SynthClass, ScaleOptions, SynthOptions, CurrentSynth) {

    var synthOptions = null;
    var scaleOptions = null;
    var currentSynth = new SynthClass();
    CurrentSynth.setCurrentSynth(currentSynth);

    var init = function() {
        var willGetSynthOptionsAndScale = $q.all([SynthOptions.getSynthOptions(), ScaleOptions.getScaleOptions()]);
        willGetSynthOptionsAndScale.then(initSynth);
        $scope.$on('$destroy', onDestroy);
    };

    var initSynth = function(promiseResults) {
        synthOptions = promiseResults[0];
        scaleOptions = promiseResults[1];
        SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
        ScaleOptions.subscribeToChangesInScaleOptions(notesChanged);
        Leapmotion.subscribeToFrameChange(frameInfoChanged);
    };

    var notesChanged = function(newValue) {
        currentSynth.scaleChanged(newValue);
    };

    var synthOptionsChanged = function(newOptions) {
        //TODO: this function is being called three times at the beginning
        synthOptions = newOptions;
        currentSynth.destroy();
        currentSynth = new SynthClass(newOptions, scaleOptions);
        CurrentSynth.setCurrentSynth(currentSynth);

        if(synthOptions.isMidiOutput()) {
            currentSynth.disable();
        }
    };

    var frameInfoChanged = function(frame) {
        //TODO: refactor this so the checking for hands comes from Synth
        //At least check if there are 2 hands to send the current one
        if(synthOptions.isMidiOutput()) {
            return;
        }
        var newFrame = frame.frame;
        if(newFrame.hands.length) {
            var motionParams = Leapmotion.getRelativePositions(newFrame, newFrame.hands);
            currentSynth.updateSound(newFrame.hands[0], motionParams);
        } else {
            currentSynth.stopPlaying();
        }
    };

    init();

    function onDestroy() {
        SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        ScaleOptions.unsubscribeToChangesInScaleOptions(notesChanged);
        // Leapmotion.unsubscribeToFrameChange(frameInfoChanged);
    }
 });
