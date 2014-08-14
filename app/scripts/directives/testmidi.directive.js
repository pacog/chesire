'use strict';

angular.module('chesireApp')

.directive('testmidi', function () {

    return {
        restrict: 'E',
        templateUrl: 'views/testmidi.html',
        scope: {},
        controller: function($scope, $q, SynthOptions, MidiApiMediator, MidiMessagesHelper) {
            var synthOptions = null;
            var willGetSynthOptions = SynthOptions.getSynthOptions();
            $q.all([MidiApiMediator, willGetSynthOptions]).then(function(promiseResults) {
                var midiAccess = promiseResults[0];
                var newSynthOptions = promiseResults[1];

                $scope.midiOutputs = midiAccess.outputs();
                $scope.selectedMidiOutput = $scope.midiOutputs[0];

                synthOptionsChanged(newSynthOptions);
                SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            });

            var synthOptionsChanged = function(newSynthOptions) {
                synthOptions = newSynthOptions;
            };

            $scope.start = function() {
                var note = {
                    midi: 69,
                    gain: 0
                };
                var midiInfo = MidiMessagesHelper.getNoteOn(note);
                $scope.selectedMidiOutput.send(midiInfo);
            };

            $scope.middle = function(val) {
                var note = {
                    midi: 69,
                    gain: parseFloat(val)
                };
                var midiInfo = MidiMessagesHelper.getKeyPressureChange(note);
                $scope.selectedMidiOutput.send(midiInfo);
            };
            
            $scope.end = function() {
                var note = {
                    midi: 69
                };
                var midiInfo = MidiMessagesHelper.getNoteOff(note);
                $scope.selectedMidiOutput.send(midiInfo);
            };
        }
    };
});