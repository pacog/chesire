(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('availableOscillators', ['sawtooth', 'sine', 'square', 'triangle', 'custom'])
        .constant('availableSimpleOscillators', ['sawtooth', 'sine', 'square', 'triangle']);
})();

