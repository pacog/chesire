'use strict';

angular.module('chesireApp')
    .factory('CurrentSynth', function() {

        var currentSynth = null;

        var setCurrentSynth = function(newSynth) {
            currentSynth = newSynth;
        };

        var getCurrentSynth = function() {
            return currentSynth;
        };

        return {
            setCurrentSynth: setCurrentSynth,
            getCurrentSynth: getCurrentSynth
        };
    });