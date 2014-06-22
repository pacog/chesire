'use strict';

angular.module('chesireApp')
    .factory('SynthClass', function(MultiNotesHelper, Sound) {

        var SynthClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        SynthClass.prototype = {

            currentHand: 'NO_HAND',

            init: function(options) {
                this.synthOptions = angular.copy(options);
                //TODO: init sounds!
                Sound.changeOscillatorType(this.synthOptions);
            },

            scaleChanged: function(newScale) {
                //TODO: check what Sound does
                Sound.changeScale(newScale);
                //TODO: check what Mutinotes does
                MultiNotesHelper.changeNotes(newScale);
            },

            stopPlaying: function() {
                Sound.stopPlaying();
            },

            updateSound: function(handInfo, motionParams) {
                this.updateVolume(motionParams);
                this.updateVibrato(motionParams);
                this.updateNoteSources(motionParams.x);

                if(this.currentHand !== handInfo.id) {
                    //TODO: why stopPlaying? handle this another way
                    Sound.stopPlaying();
                    this.currentHand = handInfo.id;
                }
            },

            updateVolume: function(motionParams) {
                var volumeInfo = this.synthOptions.volume;
                Sound.changeGain(this.getParamValue(volumeInfo, motionParams));
            },

            updateVibrato: function(motionParams) {
                var gainInfo = this.synthOptions.vibrato.gain;
                Sound.changeVibratoGain(this.getParamValue(gainInfo, motionParams));

                var freqInfo = this.synthOptions.vibrato.freq;
                Sound.changeVibratoFreq(this.getParamValue(freqInfo, motionParams));
            },

            updateNoteSources: function(x) {
                var notesInfo = MultiNotesHelper.getNotesInfo(x, this.synthOptions);
                Sound.changePlayingFrequency(notesInfo);
            },

            getParamValue: function(paramInfo, motionParams) {

                //If there is a param and a value for vibrato gain
                if(paramInfo.param && !angular.isUndefined(motionParams[paramInfo.param])) {
                    
                    if(paramInfo.inverse) {
                        return paramInfo.min + (paramInfo.max - paramInfo.min)*(motionParams[paramInfo.param]-1);
                    } else {
                        return paramInfo.min + (paramInfo.max - paramInfo.min)*motionParams[paramInfo.param];
                    }
                } else {
                    return paramInfo.initial;
                }
            },

            destroy: function() {

            }
        };

        return SynthClass;
    });