'use strict';

angular.module('chesireApp')
    .factory('OscillatorClass', function(MultiNotesHelper, OscillatorCollection, Audiocontext, MotionParamHelper) {

        var OscillatorClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        OscillatorClass.prototype = {

            connectedTo: null,

            DEFAULT_GAIN: 1,

            MIN_GAIN_CHANGE: 0.05,

            init: function(options) {
                this.options = options;
                if(this.oscillatorCollection) {
                    this.oscillatorCollection.destroy();
                }
                this.oscillatorCollection = new OscillatorCollection(options);
                this.gainController = Audiocontext.createGain();
                this.oscillatorCollection.connect(this.gainController);
            },

            changeScale: function(newScale) {
                if(this.oscillatorCollection) {
                    this.oscillatorCollection.destroy();
                }
                this.oscillatorCollection.init(newScale, this.options);
            },

            updateSound: function(motionParams) {
                this._updateNotesBeingPlayed(motionParams.x);
                this._updateGain(motionParams);
            },

            _updateNotesBeingPlayed: function(x) {

                var notesInfo = MultiNotesHelper.getNotesInfo(x, this.options.transitionType);
                this.oscillatorCollection.updateNodes(notesInfo);
            },

            _updateGain: function(motionParams) {
                var newGainValue = this.DEFAULT_GAIN;
                if(!!this.options.controls && !!this.options.controls.gain) {
                    newGainValue = MotionParamHelper.getParamValue(this.options.controls.gain, motionParams);
                }
                this._setGainControllerValue(newGainValue);
            },

            stopPlaying: function() {
                this._setGainControllerValue(0);
            },

            _setGainControllerValue: function(value) {
                var prevValue = this.gainController.gain.value;
                if(prevValue !== value) {
                    //If it is 0 or 1 we always set the value:
                    if(prevValue === 0 || prevValue === 1) {
                        this.gainController.gain.value = value;
                    }
                    //Otherwise, only if change is substantial
                    if(Math.abs(prevValue - value) > this.MIN_GAIN_CHANGE) {
                        this.gainController.gain.value = value;
                    }
                }
            },

            connectTo: function(destination) {
                if(destination.constructor.name !== 'AudioDestinationNode') {
                    destination = destination.getAudioNode();
                }
                this.connectedTo = destination;
                this.gainController.connect(destination);
            },

            destroy: function() {
                if(this.oscillatorCollection) {
                    this.oscillatorCollection.destroy();
                }
                if(this.connectedTo && this.gainController) {
                    this.gainController.disconnect(this.connectedTo);
                }
            }
        };

        return OscillatorClass;
    });