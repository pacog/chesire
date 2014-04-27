'use strict';

angular.module('chesireApp')

.controller('MidigeneratorCtrl', function ($scope, $timeout, $window, MidiApiMediator) {

    $scope.init = function() {

        MidiApiMediator.then(function(midiAccess) {
            $scope.midiOutputs = midiAccess.outputs();
            $scope.selectedMidiOutput = $scope.midiOutputs[0];
        });
    };

    $scope.init();
 });
