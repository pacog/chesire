'use strict';

angular.module('chesireApp')

.controller('SoundgeneratorCtrl', function ($scope, $timeout, Leapmotion, Sound) {

    var sounds = {};
    var MIN_FREQUENCY = 220;
    var MAX_FREQUENCY = 880;

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
                $scope.updateSound(frame.hands[0]);
            } else {
                $scope.resetVars();
                Sound.stopPlaying();
            }
        }
    };

    $scope.updateSound = function(hand) {

        var currentSounds = {};

        $scope.frequency = MIN_FREQUENCY + ($scope.x*(MAX_FREQUENCY - MIN_FREQUENCY));

        var sound = sounds[hand.id]; //Get the already existing sound if there is any

        if(!sound) {
            
            sounds[hand.id] = true;
        }
        Sound.changeGain(1-$scope.y);
        Sound.changePlayingFrequency($scope.frequency);

        currentSounds[hand.id] = true;

        for (var soundId in sounds) {
            if (!currentSounds[soundId]) {
                Sound.stopPlaying();
                delete sounds[soundId];
            }
        }
    };

    $scope.init();
 });
