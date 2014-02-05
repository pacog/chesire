'use strict';

angular.module('chesireApp')

.controller('SoundgeneratorCtrl', function ($scope, $timeout, Leapmotion, Sound) {

    var sounds = {};

    $scope.resetVars = function() {
        $scope.x = '-';
        $scope.y = '-';
        $scope.z = '-';
    };

    $scope.init = function() {
        $scope.frameInfo = Leapmotion.getFrameInfo();
        $scope.$watch('frameInfo.id', $scope.frameInfoChanged);
        $scope.resetVars();
        $timeout(function () {
            $scope.$watch('synthoptions.oscillator', $scope.oscillatoreTypeChanged);
        });
    };

    $scope.oscillatoreTypeChanged = function(newType) {

        if(newType) {
            Sound.changeOscillatorType(newType);
        }
    };

    $scope.frameInfoChanged = function() {

        var frame = Leapmotion.getFrameInfo().frame;
        if(frame) {
            if(frame.hands.length) {
                var relativePositions = Leapmotion.getRelativePositions(frame, frame.hands);
                $scope.x = relativePositions.x;
                $scope.y = relativePositions.y;
                $scope.z = relativePositions.z;
                $scope.sphereRadius = frame.hands[0].sphereRadius;
                $scope.handVelocity = relativePositions.handVelocity;
                $scope.updateSound(frame.hands[0]);
            } else {
                $scope.resetVars();
                Sound.stopPlaying();
            }
        }
    };

    $scope.getFrequency = function(x) {

        if(!$scope.chesirescale) {
            throw 'SoundGenerator: no scale present to find the correct frequency';
        }
        var notes = $scope.chesirescale.notes;
        var positionRelativeToNotes = x*(notes.length -1);

        if(positionRelativeToNotes <0) {
            positionRelativeToNotes = 0;
        }
        if(positionRelativeToNotes > (notes.length -1)) {
            positionRelativeToNotes = (notes.length -1);
        }

        if(positionRelativeToNotes === Math.round(positionRelativeToNotes)) {
            //Exact note!!
            return notes[positionRelativeToNotes].freq;
        } else {
            var firstNote = Math.floor(positionRelativeToNotes);
            var distanceInBetween = positionRelativeToNotes - firstNote;
            distanceInBetween = $scope.synthoptions.snap(distanceInBetween);
            var freq1 = notes[firstNote].freq;
            var freq2 = notes[firstNote + 1].freq;
            return freq1 + (freq2-freq1)*distanceInBetween;
        }
        
    };

    $scope.updateSound = function(hand) {

        var currentSounds = {};

        $scope.frequency = $scope.getFrequency($scope.x);

        var sound = sounds[hand.id]; //Get the already existing sound if there is any

        if(!sound) {
            
            sounds[hand.id] = true;
        }
        $scope.updateVolume();
        $scope.updateVibrato();

        Sound.changePlayingFrequency($scope.frequency);

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

    $scope.getParamValue = function(paramInfo) {

        //If there is a param and a value for vibrato gain
        if(paramInfo.param && !angular.isUndefined($scope[paramInfo.param])) {
            
            if(paramInfo.inverse) {
                return paramInfo.min + (paramInfo.max - paramInfo.min)*($scope[paramInfo.param]-1);
            } else {
                return paramInfo.min + (paramInfo.max - paramInfo.min)*$scope[paramInfo.param];
            }
        } else {
            return paramInfo.initial;
        }
    };

    $scope.init();
 });
