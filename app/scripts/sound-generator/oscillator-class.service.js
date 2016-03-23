'use strict';

angular.module('chesireApp')
    .factory('OscillatorClass', function(MultiNotesHelper, OscillatorCollection, Audiocontext, MotionParamsHelper, SynthElementsSetClass) {

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

                this.destroy();
                this.oscillatorCollection = new OscillatorCollection(options);
                this.synthElementsSet = new SynthElementsSetClass(this.oscillatorCollection, this.options.components);
                this.gainController = Audiocontext.createGain();
                this.synthElementsSet.connectTo(this.gainController);
            },

            changeScale: function(newScale) {
                if(this.oscillatorCollection) {
                    this.oscillatorCollection.destroy();
                }
                this.oscillatorCollection.init(newScale, this.options);
            },

            updateSound: function(motionParams) {
                this._updateNotesBeingPlayed(motionParams);
                this._updateGain(motionParams);
                this.synthElementsSet.updateSound(motionParams);
            },

            _updateNotesBeingPlayed: function(motionParams) {
                var notesInfo = MultiNotesHelper.getNotesInfo(motionParams, this.options);
                notesInfo.fmInfo = this._getFmInfo(motionParams);
                this.oscillatorCollection.updateNodes(notesInfo);
            },

            _getFmInfo: function(motionParams) {
                if(!this.options || !this.options.fm || !this.options.fm.enabled) {
                    return null;
                }
                var fm = this.options.fm;
                var newFmDepth = fm.depth;
                if(!!fm.controls && !!fm.controls.depth && fm.controls.depth.enabled) {
                    newFmDepth = MotionParamsHelper.getParamValue(fm.controls.depth, motionParams);
                }
                return {
                    depth: newFmDepth
                };
            },

            _updateGain: function(motionParams) {
                var newGainValue = this.options.gain;
                if(angular.isUndefined(newGainValue)) {
                    newGainValue = this.DEFAULT_GAIN;
                }
                if(!!this.options.controls && !!this.options.controls.gain && !!this.options.controls.gain.enabled) {
                    newGainValue = MotionParamsHelper.getParamValue(this.options.controls.gain, motionParams);
                }

                this._setGainControllerValue(newGainValue);
            },

            playNote: function(note, duration) {
                var self = this;
                this._setGainControllerValue(1);
                this.oscillatorCollection.playNote(note, duration).then(function() {
                    self._setGainControllerValue(0);
                });
            },

            getGain: function() {
                if(!this.options.enabled) {
                    return 0;
                }
                return this.gainController.gain.value;
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
                this.connectedTo = destination;
                this.gainController.connect(destination);
            },

            destroy: function() {
                if(this.oscillatorCollection) {
                    this.oscillatorCollection.destroy();
                    this.oscillatorCollection = null;
                }

                if(this.synthElementsSet) {
                    this.synthElementsSet.destroy();
                    this.synthElementsSet = null;
                }

                if(this.connectedTo && this.gainController) {
                    this.gainController.disconnect();
                    this.connectedTo = null;
                }
            }
        };

        return OscillatorClass;
    });