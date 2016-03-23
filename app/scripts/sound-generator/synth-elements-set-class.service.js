(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthElementsSetClass', SynthElementsSetClassFactory);

    function SynthElementsSetClassFactory(SynthElementFactory) {

        var SynthElementsSetClass = function(firstElement, componentsConfig) {
            this.init(firstElement, componentsConfig);
        };

        SynthElementsSetClass.prototype = {

            init: function(firstElement, componentsConfig) {
                this.destroy();

                this.synthElements = [firstElement];
                componentsConfig = componentsConfig || [];

                for(var i=0; i<componentsConfig.length; i++) {
                    if(componentsConfig[i].enabled) {
                        this.synthElements.push(SynthElementFactory.createSynthElement(componentsConfig[i]));
                    }
                }

                for(i=0; i<(this.synthElements.length - 1); i++) {
                    this.synthElements[i].connectTo(this.synthElements[i+1]);
                }
            },

            updateSound: function(motionParams) {
                for(var i=1; i<this.synthElements.length; i++) {
                    if(this.synthElements[i].updateSound) {
                        this.synthElements[i].updateSound(motionParams);
                    }
                }
            },

            connectTo: function(destination) {
                if((destination.constructor.name !== 'AudioDestinationNode') && (destination.constructor.name !== 'GainNode')) {
                    destination = destination.getAudioNode();
                }
                this.connectedTo = destination;
                _.last(this.synthElements).connectTo(destination);
            },

            destroy: function() {
                if(this.synthElements) {
                    for(var i=1; i<this.synthElements.length; i++) {
                        this.synthElements[i].destroy();
                    }
                }
                this.synthElements = null;

                this.connectedTo = null;
            }
        };

        return SynthElementsSetClass;
    }

})();

