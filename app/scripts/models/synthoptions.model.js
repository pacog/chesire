(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('SynthoptionsModel', SynthoptionsModel);

    function SynthoptionsModel(SynthoptionsMidiModel, SynthoptionsAudioModel) {
        var factory = {
            create: create
        };

        var DEFAULT_SYNTH_OPTIONS = {
            outputMode: 'audio',
            name: 'Default synth'
        };

        function SynthoptionsClass(options) {
            this.init(options);
            this.$$isSynth = true;
        }

        SynthoptionsClass.prototype.init = function(options) {
            options = options || {};
            angular.extend(this, DEFAULT_SYNTH_OPTIONS, options);

            this.midi = SynthoptionsMidiModel.create(this.midi);
            this.audio = SynthoptionsAudioModel.create(this.audio);
        };

        SynthoptionsClass.prototype.getActiveComponents = function() {
            if(!this.outputMode || !this[this.outputMode]) {
                return null;
            }
            return this[this.outputMode].components;
        };

        SynthoptionsClass.prototype.getActiveControls = function() {
            if(!this.outputMode || !this[this.outputMode]) {
                return null;
            }
            return this[this.outputMode].getControls();
        };

        SynthoptionsClass.prototype.getOscillators = function() {
            return this.audio.oscillators;
        };

        SynthoptionsClass.prototype.isMidiOutput = function() {
            return this.outputMode === 'midi';
        };

        SynthoptionsClass.prototype.isAudioOutput = function() {
            return this.outputMode === 'audio';
        };

        //TODO: move to oscillator itself
        SynthoptionsClass.prototype.isCustomOscillator = function() {
            return this.getOscillatorComponent().oscillatorType === 'custom';
        };

        SynthoptionsClass.prototype.removeControl = function(controlToRemove) {
            if(!this.outputMode || !this[this.outputMode]) {
                return null;
            }
            var controls = this[this.outputMode].controls;
            controls = _.without(controls, controlToRemove);
        };

        return factory;

        function create(options) {
            return new SynthoptionsClass(options);
        }
    }


})();