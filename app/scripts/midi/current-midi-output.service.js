'use strict';

angular.module('chesireApp')
    .factory('CurrentMidiOutput', function($q) {

        var currentOutput = null;
        var willBeReady = $q.defer();
        var isInitialized = false;

        var getCurrentOutput = function() {
            if(currentOutput) {
                return currentOutput;
            } else {
                throw 'MIDIOUTPUT: Error, trying to access current midi output when there is none';
            }
        };

        var setCurrentOutput = function(newOutput) {
            
            currentOutput = newOutput;
            if(!isInitialized && newOutput) {
                isInitialized = true;
                willBeReady.resolve(newOutput);
            }
        };

        var whenReady = function() {
            return willBeReady.promise;
        };

        return {
            getCurrentOutput: getCurrentOutput,
            setCurrentOutput: setCurrentOutput,
            whenReady: whenReady
        };
    });