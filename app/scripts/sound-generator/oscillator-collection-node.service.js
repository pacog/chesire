(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('OscillatorCollectionNode', OscillatorCollectionNode);

    function OscillatorCollectionNode(Audiocontext) {

        function OscillatorCollectionNodeClass(options) {
            this.init(options);
        }

        OscillatorCollectionNodeClass.prototype = {

            init: function(options) {
                this.oscillator = Audiocontext.createOscillator();
                this.gainNode = Audiocontext.createGain();
                this.setGain(0);
                this.oscillator.connect(this.gainNode);
                this.oscillator.start(0);

                this._assignOscillatorType(options);

                this._createFMComponents(options);
            },

            connect: function(destination) {
                this._connectedTo = destination;
                this.gainNode.connect(destination);
            },

            setGain: function(newGain) {
                this.gainNode.gain.value = newGain;
            },

            setFrequency: function(newFrequency) {
                if(newFrequency) {
                    this.oscillator.frequency.value = newFrequency;
                    this._updateFMFrequency();
                }
            },

            _updateFMFrequency: function() {
                if(this.modulatorOscillator && this._fmFreqRatio) {
                    this.modulatorOscillator.frequency.value = this._fmFreqRatio*this.oscillator.frequency.value;
                }
                
            },

            destroy: function() {
                this.oscillator.disconnect(this.gainNode);
                if(this._connectedTo) {
                    this.gainNode.disconnect(this._connectedTo);
                    this._connectedTo = null;
                }
            },

            _assignOscillatorType: function(options) {
                var oscillatorType = this._getOscillatorTypeFromOptions(options);

                if(oscillatorType === 'custom') {
                    this._assignPeriodicTableFromOptions(options);
                } else {
                    this.oscillator.type = oscillatorType;
                }
            },

            _getOscillatorTypeFromOptions: function(options) {
                if(!options) {
                    return 'sine';
                } else {
                    return options.oscillatorType || 'sine';
                }
            },

            _assignPeriodicTableFromOptions: function(options) {
                options.realPeriodicTable = options.realPeriodicTable || [0, 1];
                options.imaginaryPeriodicTable = options.imaginaryPeriodicTable || [0, 0];

                var realArray = new Float32Array(options.realPeriodicTable);
                var imaginaryArray = new Float32Array(options.imaginaryPeriodicTable);

                var wave = Audiocontext.createPeriodicWave(realArray, imaginaryArray);
                this.oscillator.setPeriodicWave(wave);
            },

            _createFMComponents: function(options) {
                if(!options || !options.fm || !options.fm.enabled) {
                    return;
                }
                this.modulatorOscillator = Audiocontext.createOscillator();
                this.modulatorOscillator.start();
                this.modulatorGain = Audiocontext.createGain();

                this.modulatorGain.gain.value = options.fm.depth;
                this._fmFreqRatio = options.fm.freq;
                this.modulatorOscillator.connect(this.modulatorGain);
                this.modulatorGain.connect(this.gainNode);
            }
        };


        return OscillatorCollectionNodeClass;
    }

})();