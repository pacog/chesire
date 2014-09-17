'use strict';

angular.module('chesireApp')

.controller('MidigeneratorCtrl', function ($scope, $timeout, $window, $q, MidiApiMediator, Leapmotion, MultiNotesHelper, SynthOptions, MotionParamsHelper, SynthOptionsHelper, CurrentMidiOutput) {

    var synthOptions = null;
    var notesBeingPlayed = {};

    var DEFAULT_VOLUME = 1;

    var init = function() {

        var willGetSynthOptions = SynthOptions.getSynthOptions();
        $q.all([MidiApiMediator, willGetSynthOptions]).then(function(promiseResults) {
            var midiAccess = promiseResults[0];
            var newSynthOptions = promiseResults[1];

            $scope.midiOutputs = midiAccess.outputs();
            //TODO: allow selection of midi outputs
            CurrentMidiOutput.setCurrentOutput($scope.midiOutputs[0]);

            synthOptionsChanged(newSynthOptions);
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            Leapmotion.subscribeToFrameChange(updateGeneratedMidi);
        });
    };

    var synthOptionsChanged = function(newSynthOptions) {
        if(newSynthOptions) {
            CurrentMidiOutput.getCurrentOutput().resetEverything();
            synthOptions = newSynthOptions;
            if(newSynthOptions.outputMode !== 'midi') {
                //TODO: disable
            }
            if(newSynthOptions.outputMode === 'midi') {
                //TODO: enable
            }
        }
    };

    var updateGeneratedMidi = function(newFrameInfo) {

        var notesInfo = getNotesInfo(newFrameInfo.frame);
        updateMidiSound(notesInfo, newFrameInfo.frame);
    };

    var getNotesInfo = function(frame) {
        var notesInfo = [];
        if(frame && frame.hands && frame.hands.length) {
            var motionParams = Leapmotion.getRelativePositions(frame, frame.hands);
            var oscillatorConfig = SynthOptionsHelper.getOscillatorFromOptions(synthOptions);
            notesInfo = MultiNotesHelper.getNotesInfo(motionParams.x, oscillatorConfig.transitionType);
        } else {
            stopPlaying();
        }
        return notesInfo;
    };

    var updateMidiSound = function(notesInfo, frameInfo) {
        var notesOn = [];
        var notesOff = [];
        var notesUpdate = [];

        angular.forEach(notesInfo, function(note) {
            if(note.gain) {
                if(notesBeingPlayed[note.name]) {
                    notesUpdate.push(note);
                }
                else {
                    notesOn.push(note);
                    notesBeingPlayed[note.name] = note;
                }
            } else {
                if(notesBeingPlayed[note.name]) {
                    notesOff.push(note);
                    notesBeingPlayed[note.name] = false;
                }
            }
        });

        CurrentMidiOutput.getCurrentOutput().notesOff(notesOff);
        CurrentMidiOutput.getCurrentOutput().notesOn(notesOn);
        CurrentMidiOutput.getCurrentOutput().keyPressureChanges(notesUpdate);
        updateMainVolume(frameInfo);
        updateControls(frameInfo);
    };

    var updateMainVolume = function(frameInfo) {
        if(frameInfo && !_.isEmpty(frameInfo.hands)) {
            var motionParams = Leapmotion.getRelativePositions(frameInfo, frameInfo.hands);
            var newGainValue = DEFAULT_VOLUME;
            var options = SynthOptionsHelper.getOscillatorFromOptions(synthOptions);
            if(!!options.controls && !!options.controls.gain) {
                newGainValue = MotionParamsHelper.getParamValue(options.controls.gain, motionParams);
            }

            CurrentMidiOutput.getCurrentOutput().updateMainVolume(newGainValue);
        }
    };

    var updateControls = function(frameInfo) {
        if(frameInfo && !_.isEmpty(frameInfo.hands)) {
            var motionParams = Leapmotion.getRelativePositions(frameInfo, frameInfo.hands);
            angular.forEach(synthOptions.controls, function(control) {
                var controlValue = MotionParamsHelper.getParamValue(control, motionParams);
                CurrentMidiOutput.getCurrentOutput().updateControl(control, controlValue);
            });
        }
    };

    var stopPlaying = function() {
        if(!_.isEmpty(notesBeingPlayed)) {
            CurrentMidiOutput.getCurrentOutput().allOff(_.toArray(notesBeingPlayed));
            notesBeingPlayed = {};
        }
    };


    init();
});
