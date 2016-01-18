'use strict';

angular.module('chesireApp')

.controller('ControlsHudCtrl', function ($scope, SynthOptions, MidiControlMessages) {

    var oldSynthOptions = null;

    var init = function() {
        SynthOptions.getSynthOptions().then(function(synthOptions) {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            synthOptionsChanged(synthOptions);
        });
    };

    var synthOptionsChanged = function(newSynthOptions) {
        if(!_.isEqual(newSynthOptions, oldSynthOptions)) {
            oldSynthOptions = newSynthOptions;
            $scope.controls = newSynthOptions.getActiveControls();
            $scope.oscillator = newSynthOptions.getOscillatorComponent();
        }
    };

    $scope.getMidiParamFromOptions = function(options) {
        return _.findWhere(MidiControlMessages, {number: options.number});
    };

    init();
});