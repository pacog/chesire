'use strict';

angular.module('chesireApp')
    //TODO: Sound shouldn't be used here but in the SynthComponents
    .factory('SynthClass', function(Audiocontext, OscillatorClass) {

        var SynthClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        SynthClass.prototype = {

            init: function(options) {
                this.synthOptions = angular.copy(options);
                this._createComponents();
            },

            _createComponents: function() {
                if(this._areOptionsCorrect()) {
                    //TODO: factory of components, each one is created and connected
                    this.oscillator = new OscillatorClass(this.synthOptions.components[0]);
                    this.oscillator.connectTo(Audiocontext.destination);
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
                this.oscillator.changeScale(newScale);
            },

            stopPlaying: function() {
                this.oscillator.stopPlaying();
            },

            updateSound: function(handInfo, motionParams) {
                this.oscillator.updateSound(motionParams);
                //TODO: update other pedals
            },

            destroy: function() {
                //TODO: destroy other pedals
                if(this.oscillator) {
                    this.oscillator.destroy();
                }
            }
        };

        return SynthClass;
    });