'use strict';

angular.module('chesireApp')

.controller('MidigeneratorCtrl', function ($scope, $timeout, $window, $q, MidiApiMediator, Leapmotion, MultiNotesHelper, SynthOptions) {

    var synthOptions = null;
    var notesBeingPlayed = {};

    var init = function() {

        var willGetSynthOptions = SynthOptions.getSynthOptions();
        $q.all([MidiApiMediator, willGetSynthOptions]).then(function(promiseResults) {
            var midiAccess = promiseResults[0];
            var newSynthOptions = promiseResults[1];

            $scope.midiOutputs = midiAccess.outputs();
            $scope.selectedMidiOutput = $scope.midiOutputs[0];

            synthOptionsChanged(newSynthOptions);
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            Leapmotion.subscribeToFrameChange(updateGeneratedMidi);
        });
    };

    var synthOptionsChanged = function(newSynthOptions) {
        if(newSynthOptions) {
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
        updateMidiSound(notesInfo);
    };

    var getNotesInfo = function(frame) {
        var notesInfo = [];
        if(frame && frame.hands && frame.hands.length) {
            var motionParams = Leapmotion.getRelativePositions(frame, frame.hands);
            //TODO: getting transition type like this is ugly. call a method in synthOptions directive
            notesInfo = MultiNotesHelper.getNotesInfo(motionParams.x, synthOptions.components[0].transitionType);
        } else {
            stopPlaying();
        }
        return notesInfo;
    };

    var updateMidiSound = function(notesInfo) {
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

        $scope.selectedMidiOutput.notesOff(notesOff);
        $scope.selectedMidiOutput.notesOn(notesOn);
        
        $scope.selectedMidiOutput.keyPressureChanges(notesUpdate);
    };

    var stopPlaying = function() {
        if(!_.isEmpty(notesBeingPlayed)) {
            $scope.selectedMidiOutput.allOff(_.toArray(notesBeingPlayed));
            notesBeingPlayed = {};
        }
    };


    init();
});
