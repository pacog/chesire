'use strict';

angular.module('chesireApp')

.directive('midiOutputSelector', function () {
    return {
        templateUrl: 'scripts/synth-options/midi-output-selector/midi-output-selector.html',
        restrict: 'E',
        scope: {},
        controller: 'MidiOutputSelectorCtrl'
    };
});