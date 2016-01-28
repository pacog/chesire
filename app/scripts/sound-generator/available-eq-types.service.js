(function() {
    'use strict';

    angular.module('chesireApp')
        .constant('availableEqTypes', [
            {
                name: 'Low pass',
                id: 'lowpass',
                usesGain: false,
                usesQ: true
            },{
                name: 'High pass',
                id: 'highpass',
                usesGain: false,
                usesQ: true
            },{
                name: 'Band pass',
                id: 'bandpass',
                usesGain: false,
                usesQ: true
            },{
                name: 'Low shelf',
                id: 'lowshelf',
                usesGain: false,
                usesQ: false
            },{
                name: 'High shelf',
                id: 'highshelf',
                usesGain: true,
                usesQ: false
            },{
                name: 'Peaking',
                id: 'peaking',
                usesGain: true,
                usesQ: true
            },{
                name: 'Notch',
                id: 'notch',
                usesGain: true,
                usesQ: true
            },{
                name: 'All pass',
                id: 'allpass',
                usesGain: false,
                usesQ: true
            }
        ]);
})();