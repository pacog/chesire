'use strict';

angular.module('chesireApp')

.controller('SoundgeneratorCtrl', function ($scope, $timeout, Leapmotion, Sound, MultiNotesHelper) {

    var sounds = {};

    $scope.resetVars = function() {
        $scope.motionParams = {};
    };

    $scope.init = function() {
        $scope.frameInfo = Leapmotion.getFrameInfo();
        $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
        $scope.resetVars();
        $timeout(function () {
            $scope.$watch('synthoptions.oscillator', $scope.oscillatorTypeChanged);
            $scope.$watchCollection('chesirescale.currentScale', $scope.notesChanged);
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

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                $scope.motionParams = Leapmotion.getRelativePositions(frame, frame.hands);
                $scope.updateSound(frame.hands[0]);
            } else {
                $scope.resetVars();
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

        Sound.changePlayingFrequency(MultiNotesHelper.getNotesInfo(x, $scope.synthoptions));
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

    $scope.init();
 });
