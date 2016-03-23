(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthoptionsAudioModel', SynthoptionsAudioModel);

    function SynthoptionsAudioModel(synthOptionsAudioDefault, oscillatorOptionsDefault, noiseOptionsDefault, distortionOptionsDefault, tremoloOptionsDefault, delayOptionsDefault, eqOptionsDefault, IdGenerator) {
        var factory = {
            create: create
        };

        function SynthoptionsAudioClass(options) {
            this.init(options);
        }

        SynthoptionsAudioClass.prototype.init = function(options) {
            options = angular.extend({}, synthOptionsAudioDefault.get(), options || {});
            angular.extend(this, synthOptionsAudioDefault.get(), options);
        };

        SynthoptionsAudioClass.prototype.getControls = function() {
            var controls = this._getControlsFromComponents();
            controls = controls.concat(this._getControlsFromSoundSources());
            return controls;
        };

        SynthoptionsAudioClass.prototype.addOscillator = function() {
            var newOscillator = angular.copy(oscillatorOptionsDefault.get());
            addIdToElement(newOscillator);
            this.oscillators.push(newOscillator);
            return newOscillator;
        };

        SynthoptionsAudioClass.prototype.removeOscillator = function(oscillatorInfo) {
            var oscillatorIndex = _.findIndex(this.oscillators, function(otherOscillator) {
                return oscillatorInfo.uniqueId === otherOscillator.uniqueId;
            });
            if(oscillatorIndex > -1) {
                this.oscillators.splice(oscillatorIndex, 1);
            }
        };

        SynthoptionsAudioClass.prototype.removeNoise = function(noiseInfo) {
            var noiseIndex = _.findIndex(this.noises, function(otherNoise) {
                return noiseInfo.uniqueId === otherNoise.uniqueId;
            });
            if(noiseIndex > -1) {
                this.noises.splice(noiseIndex, 1);
            }
        };

        SynthoptionsAudioClass.prototype.removeComponent = function(componentInfo) {
            var componentIndex = _.findIndex(this.components, function(otherComponent) {
                return componentInfo.uniqueId === otherComponent.uniqueId;
            });
            if(componentIndex > -1) {
                this.components.splice(componentIndex, 1);
            }
        };

        SynthoptionsAudioClass.prototype.addNoise = function() {
            var newNoise = angular.copy(noiseOptionsDefault.get());
            addIdToElement(newNoise);
            this.noises.push(newNoise);
            return newNoise;
        };

        SynthoptionsAudioClass.prototype.addComponent = function(componentInfo) {
            this.components = this.components || [];

            var newComponent;

            switch(componentInfo.value) {
                case 'eq':
                    newComponent = angular.copy(eqOptionsDefault.get());
                    break;
                case 'tremolo':
                    newComponent = angular.copy(tremoloOptionsDefault.get());
                    break;
                case 'delay':
                    newComponent = angular.copy(delayOptionsDefault.get());
                    break;
                case 'distortion':
                    newComponent = angular.copy(distortionOptionsDefault.get());
                    break;
            }

            if(newComponent) {
                addIdToElement(newComponent);
                this.components.push(newComponent);
                return newComponent;
            }
        };

        SynthoptionsAudioClass.prototype.moveComponentAfterComponent = function(origin, destination) {
            //Removing origin if it was already there
            var originIndex = this._getIndexOfComponent(origin);
            if(originIndex > -1) {
                this.components.splice(originIndex, 1);
            }

            //Adding after destination component, or at beginning if no destination
            var destinationIndex = this._getIndexOfComponent(destination);
            this.components.splice(destinationIndex + 1, 0, origin);
        };

        SynthoptionsAudioClass.prototype._getIndexOfComponent = function(component) {
            return _.findIndex(this.components, function(eachComponent) {
                return eachComponent.uniqueId === component.uniqueId;
            });
        };

        SynthoptionsAudioClass.prototype._getControlsFromComponents = function() {
            var controls = [];
            for(var i=0; i<this.components.length; i++) {
                if(this.components[i].enabled) {
                    controls = controls.concat(getControlsFromComponent(this.components[i]));
                }
            }
            return controls;
        };

        SynthoptionsAudioClass.prototype._getControlsFromSoundSources = function() {
            var controls = [];
            for(var i=0; i<this.oscillators.length; i++) {
                if(this.oscillators[i].enabled) {
                    controls = controls.concat(getControlsFromComponent(this.oscillators[i]));
                    var fm = this.oscillators[i].fm;
                    if(fm && fm.enabled) {
                        controls = controls.concat(getControlsFromComponent(fm));
                    }
                }
            }
            for(i=0; i<this.noises.length; i++) {
                if(this.noises[i].enabled) {
                    controls = controls.concat(getControlsFromComponent(this.noises[i]));
                }
            }

            return controls;
        };

        return factory;

        function create(options) {
            return new SynthoptionsAudioClass(options);
        }

        function getControlsFromComponent(component) {
            var controls = [];
            angular.forEach(component.controls, function(control) {
                if(control.enabled) {
                    controls.push(control);
                }
            });
            return controls;
        }

        function addIdToElement(element) {
            if(element && !element.uniqueId) {
                element.uniqueId = IdGenerator.getUniqueId();
            }
        }
    }

})();