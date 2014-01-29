'use strict';

angular.module('chesireApp')

.controller('SynthoptionsCtrl', function ($scope) {
    $scope.availableOscillators = ['sawtooth', 'sine', 'square', 'triangle'];
    $scope.synthoptions.oscillator = $scope.availableOscillators[0];
});
