'use strict';

angular.module('chesireApp')

.controller('SoundgeneratorCtrl', function ($scope, $timeout, Leapmotion, Sound, MultiNotesHelper, ScaleOptions, SynthOptions) {

    var sounds = {};
    var synthOptions;

    var resetVars = function() {
        $scope.motionParams = {};
    };

    var init = function() {
        resetVars();
        Leapmotion.subscribeToFrameChange($scope.frameInfoChanged);

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
            Sound.changeScale(newValue);
            MultiNotesHelper.changeNotes(newValue);
        }
    };

    var synthOptionsChanged = function(newOptions) {
        synthOptions = newOptions;
        Sound.changeOscillatorType(newOptions);
    };

    $scope.frameInfoChanged = function(frame) {

        var newFrame = frame.frame;
        if(newFrame) {
            if(newFrame.hands.length) {
                $scope.motionParams = Leapmotion.getRelativePositions(newFrame, newFrame.hands);
                $scope.updateSound(newFrame.hands[0]);
            } else {
                resetVars();
                Sound.stopPlaying();
            }
        }
    };

    $scope.updateSound = function(hand) {
        var currentSounds = {};
        var sound = sounds[hand.id]; //Get the already existing sound if there is any

        if(!sound) {
            
            sounds[hand.id] = true;
        }
        $scope.updateVolume();
        $scope.updateVibrato();
        $scope.updateNoteSources($scope.motionParams.x);

        currentSounds[hand.id] = true;

        for (var soundId in sounds) {
            if (!currentSounds[soundId]) {
                Sound.stopPlaying();
                delete sounds[soundId];
            }
        }
    };

    $scope.updateVolume = function() {
        var volumeInfo = synthOptions.volume;
        Sound.changeGain($scope.getParamValue(volumeInfo));
    };

    $scope.updateVibrato = function() {

        var gainInfo = synthOptions.vibrato.gain;
        Sound.changeVibratoGain($scope.getParamValue(gainInfo));

        var freqInfo = synthOptions.vibrato.freq;
        Sound.changeVibratoFreq($scope.getParamValue(freqInfo));
    };

    $scope.updateNoteSources = function(x) {
        $scope.notesInfo = MultiNotesHelper.getNotesInfo(x, synthOptions);
        Sound.changePlayingFrequency($scope.notesInfo);
    };

    $scope.getParamValue = function(paramInfo) {

        //If there is a param and a value for vibrato gain
        if(paramInfo.param && !angular.isUndefined($scope.motionParams[paramInfo.param])) {
            
            if(paramInfo.inverse) {
                return paramInfo.min + (paramInfo.max - paramInfo.min)*($scope.motionParams[paramInfo.param]-1);
            } else {
                return paramInfo.min + (paramInfo.max - paramInfo.min)*$scope.motionParams[paramInfo.param];
            }
        } else {
            return paramInfo.initial;
        }
    };

    init();
 });
