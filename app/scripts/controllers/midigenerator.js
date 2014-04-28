'use strict';

angular.module('chesireApp')

.controller('MidigeneratorCtrl', function ($scope, $timeout, $window, MidiApiMediator, Leapmotion, MultiNotesHelper) {

    var currentSounds = [];
    var mnh = null;

    var init = function() {

        MidiApiMediator.then(function(midiAccess) {
            $scope.midiOutputs = midiAccess.outputs();
            $scope.selectedMidiOutput = $scope.midiOutputs[0];
            Leapmotion.subscribeToFrameChange(updateGeneratedMidi);
        });
    };

    var updateGeneratedMidi = function(newFrameInfo) {

        var notesInfo = getNotesInfo(newFrameInfo.frame);
        updateMidiSound(notesInfo);
    };

    var getNotesInfo = function(frame) {
        var notesInfo = [];
        if(frame && frame.hands && frame.hands.length) {
            var motionParams = Leapmotion.getRelativePositions(frame, frame.hands);
            notesInfo = MultiNotesHelper.getNotesInfo(motionParams.x);

        }
        return notesInfo;
    };

    var updateMidiSound = function(notesInfo) {
        stopPlayingCurrentMidiSounds();
        startPlayingMidiSoundsFromNotes(notesInfo);
    };

    var stopPlayingCurrentMidiSounds = function() {

        angular.forEach(currentSounds, function(sound) {
            var midiCommand = mnh.noteOff(sound);
            MidiApiMediator.send(midiCommand);
        });
        currentSounds = [];
    };

    var startPlayingMidiSoundsFromNotes = function(notesInfo) {

        angular.forEach(notesInfo, function(note) {
            var midiCommand = mnh.noteOn(note);
            MidiApiMediator.send(midiCommand);
            currentSounds.push(midiCommand);
        });
    };

    init();
});
