'use strict';

angular.module('chesireApp')

.factory('MidiAccess', function($timeout, $q) {

    var readyPromise = null;

    var init = function() {

        readyPromise = $q.defer();

        $timeout(function() {
            navigator.requestMIDIAccess().then(onMidiAccessReady, onMidiAccessError);
        });
    };

    var getReadyPromise = function() {
        return readyPromise.promise;
    };

    var onMidiAccessReady = function(midiAccess) {
        readyPromise.resolve(midiAccess);
    };

    var onMidiAccessError = function(error) {
        readyPromise.reject(error);
    };

    init();

    return {
        getReadyPromise: getReadyPromise
    };
});