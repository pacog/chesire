(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthoptionsAudioModel', SynthoptionsAudioModel);

    function SynthoptionsAudioModel(synthOptionsAudioDefault) {
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
    }

})();