'use strict';

angular.module('chesireApp')
    .factory('CurrentMidiOutput', function() {

        var currentOutput = null;

        var getCurrentOutput = function() {
            if(currentOutput) {
                return currentOutput;
            } else {
                throw 'MIDIOUTPUT: Error, trying to access current midi output when there is none';
            }
        };
        var setCurrentOutput = function(newOutput) {
            currentOutput = newOutput;
        };

        return {
            getCurrentOutput: getCurrentOutput,
            setCurrentOutput: setCurrentOutput
        };
    });