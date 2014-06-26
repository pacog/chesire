'use strict';

angular.module('chesireApp')
    //TODO: Sound shouldn't be used here but in the SynthComponents
    .factory('SynthClass', function(Audiocontext, SynthElementFactory) {

        var SynthClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        SynthClass.prototype = {

            synthElements: null,

            init: function(options) {
                this.synthOptions = angular.copy(options);
                this.synthElements = [];
                this._createComponents();
            },

            _createComponents: function() {
                if(this._areOptionsCorrect()) {
                    var self = this;
                    angular.forEach(this.synthOptions.components, function(synthElementOptions) {
                        self.synthElements.push(SynthElementFactory.createSynthElement(synthElementOptions));
                    });

                    for(var i=0; i<(this.synthElements.length - 1); i++) {
                        this.synthElements[i].connectTo(this.synthElements[i+1]);
                    }
                    _.last(this.synthElements).connectTo(Audiocontext.destination);
                    //TODO: create the rest of components and connect them
                    // var lastComponent <- connect this one to the output
                } else {
                    throw 'SynthClass: error creating components, wrong options';
                }
            },

            _areOptionsCorrect: function() {
                if(this.synthOptions) {
                    var thereIsAnOscillator = (!!this.synthOptions.components && !!this.synthOptions.components[0] && (this.synthOptions.components[0].type === 'oscillator'));
                    return thereIsAnOscillator;
                }
                return false;
            },

            scaleChanged: function(newScale) {
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
            },

            destroy: function() {
                angular.forEach(this.synthElements, function(synthElement) {
                    synthElement.destroy();
                });
                this.synthElements = [];
            }
        };

        return SynthClass;
    });