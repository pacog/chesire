'use strict';

angular.module('chesireApp')

.controller('SynthoptionsCtrl', function ($scope) {
    $scope.availableOscillators = ['sawtooth', 'sine', 'square', 'triangle'];
    $scope.synthoptions.oscillator = $scope.availableOscillators[0];

    $scope.synthoptions.vibrato = {
        freq: {
            initial: 10,
            min: 4,
            max: 20,
            param: 'y',
            inverse: true
        },
        gain: {
            initial: 0,
            min: 0,
            max: 1,
            param: 'z',
            inverse: true
        }
    };

    $scope.synthoptions.volume = {
        initial: 0.5,
        min: 0,
        max: 0.8,
        param: 'handDirectionY',
        inverse: true
    };

    $scope.synthoptions.snap = function(x) {

        var SNAP_DISTANCE = 0.4;

        if(x<SNAP_DISTANCE) {
            return 0;
        }
        if(x>=SNAP_DISTANCE && x < 0.5) {
            return ((x - SNAP_DISTANCE)*0.5)/(0.5 - SNAP_DISTANCE) + SNAP_DISTANCE;
        }
        if(x >= 0.5 && x < (1-SNAP_DISTANCE)) {
            return ((x - SNAP_DISTANCE)*0.5)/(0.5 - SNAP_DISTANCE) + SNAP_DISTANCE;
        }
        return 1;

    };
});