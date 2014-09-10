'use strict';

angular.module('chesireApp')

.factory('SynthOptionsHelper', function () {

    var getOscillatorFromOptions = function(options) {
        if(options && options.components) {
            return _.findWhere(options.components, { type: 'oscillator' });
        }
        return null;
    };

    return {
        getOscillatorFromOptions: getOscillatorFromOptions
    };
});
