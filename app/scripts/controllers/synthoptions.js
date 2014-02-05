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
            param: 'handVelocity',
            inverse: false
        },
        gain: {
            initial: 1,
            min: 0,
            max: 1,
            param: 'z',
            inverse: true
        }
    };
});
