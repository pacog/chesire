'use strict';

angular.module('chesireApp')

.controller('SoundgeneratorCtrl', function ($scope, $timeout, Leapmotion, Sound, MultiNotesHelper) {

    var sounds = {};

    var resetVars = function() {
        $scope.motionParams = {};
    };

    var init = function() {
        Leapmotion.subscribeToFrameChange($scope.frameInfoChanged);
        resetVars();
        $timeout(function () {
            $scope.$watch('synthoptions.oscillator', $scope.oscillatorTypeChanged);
            $scope.$watch('chesirescale.currentScale', $scope.notesChanged);
        });
    };

    $scope.notesChanged = function(newValue) {

        if(newValue) {
            Sound.changeScale(newValue);
            MultiNotesHelper.changeNotes(newValue);
        }
    };

    $scope.oscillatorTypeChanged = function(newType) {

        if(newType) {
            Sound.changeOscillatorType(newType);
        }
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

        // $scope.currentsound.frequency = $scope.getFrequency($scope.motionParams.x);

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
        var volumeInfo = $scope.synthoptions.volume;
        Sound.changeGain($scope.getParamValue(volumeInfo));
    };

    $scope.updateVibrato = function() {

        var gainInfo = $scope.synthoptions.vibrato.gain;
        Sound.changeVibratoGain($scope.getParamValue(gainInfo));

        var freqInfo = $scope.synthoptions.vibrato.freq;
        Sound.changeVibratoFreq($scope.getParamValue(freqInfo));
    };

    $scope.updateNoteSources = function(x) {

        if(!$scope.chesirescale || !$scope.chesirescale.currentScale) {
            throw 'SoundGenerator: no scale present to find the correct frequency';
        }

        $scope.notesInfo = MultiNotesHelper.getNotesInfo(x, $scope.synthoptions);
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
