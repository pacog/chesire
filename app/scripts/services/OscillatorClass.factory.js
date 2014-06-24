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

            init: function(options) {
                this.options = options;
                this.oscillatorCollection = new OscillatorCollection();
                this.gainController = Audiocontext.createGainNode();
                this.oscillatorCollection.connect(this.gainController);
            },

            changeScale: function(newScale) {
                MultiNotesHelper.changeNotes(newScale);
                if(this.oscillatorCollection) {
                    this.oscillatorCollection.destroy();
                }
                this.oscillatorCollection.init(newScale);
            },

            updateSound: function(motionParams) {
                this._updateNotesBeingPlayed(motionParams.x);
                this._updateGain(motionParams);
            },

            _updateNotesBeingPlayed: function(x) {
                var notesInfo = MultiNotesHelper.getNotesInfo(x, this.synthOptions);
                this.oscillatorCollection.updateNodes(notesInfo);
            },

            _updateGain: function(motionParams) {
                var newGainValue = this.DEFAULT_GAIN;
                if(!!this.options.controls && !!this.options.controls.gain) {
                    newGainValue = MotionParamHelper.getParamValue(this.options.controls.gain, motionParams);
                }
                if(this.gainController.gain.value !== newGainValue) {
                    this.gainController.gain.value = newGainValue;
                }
            },

            stopPlaying: function() {
                this.gainController.gain.value = 0;
            },

            connectTo: function(destination) {
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