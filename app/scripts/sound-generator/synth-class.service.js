'use strict';

angular.module('chesireApp')
    .factory('SynthClass', function(Audiocontext, SynthElementFactory, SoundSourceClass, soundMuter) {

        var SynthClass = function(synthOptions, scaleOptions) {
            if(synthOptions && scaleOptions) {
                this.init(synthOptions, scaleOptions);
            }
        };

        SynthClass.prototype = {

            synthElements: null,

            init: function(synthOptions, scaleOptions) {
                this.mainGain = Audiocontext.createGain();
                this.mainGain.gain.value = 1;
                this.mainGain.connect(Audiocontext.destination);
                this.synthOptions = angular.copy(synthOptions);
                this.scaleOptions = angular.copy(scaleOptions);
                this.synthElements = [];
                this._createComponents();
                this.scaleChanged(this.scaleOptions);
            },

            getComponent: function(componentInfo) {
                return _.find(this.synthElements, function(synthElement) {
                    return synthElement.options.uniqueId === componentInfo.uniqueId;
                });
            },

            playNote: function(note, duration) {
                angular.forEach(this.synthElements, function(synthElement) {
                    if(synthElement.playNote) {
                        synthElement.playNote(note, duration);
                    }
                });
            },

            _createComponents: function() {
                if(this._areOptionsCorrect()) {
                    var self = this;
                    this.synthElements = [];

                    this.synthElements.push(this._createSoundSource());

                    angular.forEach(this.synthOptions.getActiveComponents(), function(synthElementOptions) {
                        if(synthElementOptions.enabled) {
                            self.synthElements.push(SynthElementFactory.createSynthElement(synthElementOptions));
                        }
                    });

                    for(var i=0; i<(this.synthElements.length - 1); i++) {
                        this.synthElements[i].connectTo(this.synthElements[i+1]);
                    }
                    _.last(this.synthElements).connectTo(this.mainGain);

                } else {
                    throw 'SynthClass: error creating components, wrong options';
                }
            },

            _createSoundSource: function() {
                return new SoundSourceClass(this.synthOptions.audio);
            },

            _areOptionsCorrect: function() {
                if(this.synthOptions) {
                    var oscillatorOptions = this.synthOptions.getOscillators();
                    var thereIsAnOscillator = (oscillatorOptions && oscillatorOptions.length >= 1);
                    return thereIsAnOscillator;
                }
                return false;
            },

            scaleChanged: function(newScale) {
                this.scaleOptions = newScale;
                angular.forEach(this.synthElements, function(synthElement) {
                    if(synthElement.changeScale) {
                        synthElement.changeScale(newScale);
                    }
                });
            },

            stopPlaying: function() {
                angular.forEach(this.synthElements, function(synthElement) {
                    if(synthElement.stopPlaying) {
                        synthElement.stopPlaying();
                    }
                });
            },

            updateSound: function(handInfo, motionParams) {
                angular.forEach(this.synthElements, function(synthElement) {
                    if(synthElement.updateSound) {
                        synthElement.updateSound(motionParams);
                    }
                });
                this._muteMainGainIfNeeded();
            },

            _muteMainGainIfNeeded: function() {
                var newGainValue = 1;
                if(soundMuter.isMuted()) {
                    newGainValue = 0;
                }
                if(this._oldGainValue !== newGainValue) {
                    this._oldGainValue = newGainValue;
                    this.mainGain.gain.value = newGainValue;
                }
            },

            disable: function() {
                //TODO: shouldn't access the gain node from here, best create a disconnect method,
                // so we can use it in other kinds of components too
                _.last(this.synthElements).gainController.disconnect(this.mainGain);
            },

            destroy: function() {
                angular.forEach(this.synthElements, function(synthElement) {
                    synthElement.destroy();
                });
                this.synthElements = [];

                if(this.mainGain) {
                    this.mainGain.disconnect();
                    this.mainGain = null;
                }
            }
        };

        return SynthClass;
    });