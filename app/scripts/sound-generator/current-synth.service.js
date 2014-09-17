'use strict';

angular.module('chesireApp')
    .factory('CurrentSynth', function() {

        var currentSynth = null;
        var subscribers = [];

        var setCurrentSynth = function(newSynth) {
            currentSynth = newSynth;
            angular.forEach(subscribers, function(callback) {
                callback(newSynth);
            });
        };

        var getCurrentSynth = function() {
            return currentSynth;
        };

        var subscribeToChangesInCurrentSynth = function(callback) {
            subscribers.push(callback);
        };

        return {
            setCurrentSynth: setCurrentSynth,
            getCurrentSynth: getCurrentSynth,
            subscribeToChangesInCurrentSynth: subscribeToChangesInCurrentSynth
        };
    });