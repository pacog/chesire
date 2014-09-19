'use strict';

angular.module('chesireApp')
    .factory('VisualizationKeyHelper', function(SpaceConverter, CurrentSynth, MultiNotesHelper) {

        var keyRanges = null;
        var CHORDS_WIDTH = 10;
        var currentOscillator = null;
        var currentSynth = null;

        var init = function() {
            currentSynth = CurrentSynth.getCurrentSynth();
            CurrentSynth.subscribeToChangesInCurrentSynth(synthChanged);
        };

        var synthChanged = function() {
            currentSynth = CurrentSynth.getCurrentSynth();
            currentOscillator = false;
            if(currentSynth && currentSynth.synthElements) {
                currentOscillator = currentSynth.synthElements[0];
            }
        };

        var isParticleInKey = function(x) {
            for(var i=0; i<keyRanges.length; i++) {
                if( (x >= keyRanges[i].start) && (x < keyRanges[i].end)) {
                    return true;
                }
            }
            return false;
        };

        //TODO: try not to use currentOscillator to get this, too many crossing dependencies
        var getCurrentFrequency = function() {
            return currentOscillator.oscillatorCollection.getNodes()[0].oscillator.frequency.value;
        };

        var getCurrentGain = function() {
            return currentOscillator.gainController.gain.value;
        };

        var createKeyRanges = function(newScale) {
            keyRanges = [];
            var chords = newScale.chords;
            var interactionBox = SpaceConverter.getBoxSize();
            var boxLimits = SpaceConverter.getBoxLimits();
            for(var i=0; i<chords.length; i++) {
                var middle = (interactionBox.width/(chords.length-1))*(i) + boxLimits.xMin;
                keyRanges.push({
                    start: middle - (CHORDS_WIDTH/2) ,
                    middle: middle,
                    end: middle + (CHORDS_WIDTH/2)
                });
            }
        };

        var getKeyRanges = function() {
            return keyRanges;
        };

        var getKeyRangesVolume = function(relativeX) {
            return MultiNotesHelper.getChordsRelevanceFromX(relativeX);
        };

        init();

        return {
            createKeyRanges: createKeyRanges,
            isParticleInKey: isParticleInKey,
            getKeyRanges: getKeyRanges,
            getCurrentFrequency: getCurrentFrequency,
            getCurrentGain: getCurrentGain,
            getKeyRangesVolume: getKeyRangesVolume
        };
    });
