'use strict';

angular.module('chesireApp')
    .factory('VisualizationKeyHelper', function(SpaceConverter) {

        var keyRanges = null;
        var CHORDS_WIDTH = 10;

        var init = function() {
        };

        var isParticleInKey = function(x) {
            for(var i=0; i<keyRanges.length; i++) {
                if( (x >= keyRanges[i].start) && (x < keyRanges[i].end)) {
                    return true;
                }
            }
            return false;
        };

        var createKeyRanges = function(newScale) {
            keyRanges = [];
            var chords = newScale.chords;
            var interactionBox = SpaceConverter.getBoxSize();
            var boxLimits = SpaceConverter.getBoxLimits();
            for(var i=0; i<chords.length; i++) {
                keyRanges.push({
                    start: (interactionBox.width/(chords.length-1))*(i) - (CHORDS_WIDTH/2) + boxLimits.xMin,
                    end: (interactionBox.width/(chords.length-1))*(i) + (CHORDS_WIDTH/2) + boxLimits.xMin
                });
            }
        };

        init();

        return {
            createKeyRanges: createKeyRanges,
            isParticleInKey: isParticleInKey
        };
    });
