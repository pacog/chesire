'use strict';

angular.module('chesireApp')

.controller('MidiOutputSelectorCtrl', function ($scope, MidiApiMediator, CurrentMidiOutput) {

    var init = function() {

        $scope.loading = true;
        CurrentMidiOutput.whenReady().then(function() {

            MidiApiMediator.then(function(midiAccess) {
                $scope.midiOutputs = midiAccess.outputs();
                $scope.loading = false;
            });

            midiOutputChanged(CurrentMidiOutput.getCurrentOutput());

            $scope.$watch(function() {
                return CurrentMidiOutput.getCurrentOutput();
            }, midiOutputChanged);

            $scope.$watch('selectedMidiOutput.id', selectedNewMidiOutput);
        });
    };

    var midiOutputChanged = function(newMidiOutput) {
        $scope.selectedMidiOutput = newMidiOutput;
    };

    var selectedNewMidiOutput = function(newId) {
        var currentOutput = CurrentMidiOutput.getCurrentOutput();
        if(currentOutput.id !== newId) {
            CurrentMidiOutput.setCurrentOutput($scope.selectedMidiOutput);
        }
    };

    init();
 });