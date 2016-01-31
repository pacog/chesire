(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('DistortionClass', DistortionClassFactory);

    function DistortionClassFactory(Audiocontext, MotionParamsHelper) {

        var DistortionClass = function(options) {
            if(options) {
                this.init(options);
            }
        };

        DistortionClass.prototype = {

            init: function(options) {
                this.options = options;
                this.shaper = Audiocontext.createWaveShaper();
                this.shaper.oversample = '4x';
            },

            getAudioNode: function() {
                return this.shaper;
            },

            updateSound: function(motionParams) {
                this._updateAmount(motionParams);
            },

            _updateAmount: function(motionParams) {
                var newAmount = this.options.amount;
                if(!!this.options.controls && !!this.options.controls.amount && !!this.options.controls.amount.enabled) {
                    newAmount = MotionParamsHelper.getParamValue(this.options.controls.amount, motionParams);
                    newAmount = this._adjustValue(newAmount, this.options.MIN_AMOUNT, this.options.MAX_AMOUNT);
                }
                this._setAmountValue(newAmount);
            },

            _adjustValue: function(value, min, max) {
                min = parseFloat(min);
                max = parseFloat(max);
                return (value*(max-min)) + min;
            },

            _setAmountValue: function(value) {
                if(this.currentAmount !== value) {
                    this.currentAmount = value;
                    this.shaper.curve = makeDistortionCurve(value);
                }
            },

            connectTo: function(destination) {
                if(destination.constructor.name !== 'AudioDestinationNode') {
                    destination = destination.getAudioNode();
                }
                this.connectedTo = destination;
                this.shaper.connect(destination);
            },

            destroy: function() {
                if(this.connectedTo && this.shaper) {
                    this.shaper.disconnect();
                    this.connectedTo = null;
                }
            }
        };

        //Copied from https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
        function makeDistortionCurve(amount) {
            var k = typeof amount === 'number' ? amount : 50,
                n_samples = 44100,
                curve = new Float32Array(n_samples),
                deg = Math.PI / 180,
                i = 0,
                x;
            for ( ; i < n_samples; ++i ) {
                x = i * 2 / n_samples - 1;
                curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
            }
            return curve;
        }

        return DistortionClass;
    }

})();

