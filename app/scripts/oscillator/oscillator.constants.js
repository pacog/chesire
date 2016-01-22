(function() {
    'use strict';

    angular.module('chesireApp')

        .constant('oscillatorTransitionTypes', [{
            name: 'Glissando',
            value: 'glissando'
        }, {
            name: 'Volume',
            value: 'volume'
        }])

        .constant('oscillatorMidiControlModes', [{
            name: 'Soft',
            value: 'soft'
        }, {
            name: 'Pulsate chord',
            value: 'pulsate_chord'
        }, {
            name: 'Pulsate notes',
            value: 'pulsate'
        }]);
})();