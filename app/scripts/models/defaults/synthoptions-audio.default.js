(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('synthOptionsAudioDefault', synthOptionsAudioDefault);

    function synthOptionsAudioDefault(availableOscillators, oscillatorOptionsDefault, noiseOptionsDefault, distortionOptionsDefault, tremoloOptionsDefault, delayOptionsDefault, eqOptionsDefault) {
        var factory = {
            get: get
        };

        return factory;

        function get() {
            return {
                snapDistance: 0.35,
                transitionType: 'glissando',
                controls: {
                    'gain': {
                        name: 'Main volume',
                        param: 'y',
                        responseFunction: {
                            name: 'linear',
                            min: 0.0,
                            max: 0.9,
                            inverse: true
                        }
                    }
                },
                oscillators: [
                    oscillatorOptionsDefault.get(),
                    oscillatorOptionsDefault.get({
                        enabled: false,
                        oscillatorType: availableOscillators[2]
                    }),
                    oscillatorOptionsDefault.get({
                        enabled: false,
                        oscillatorType: availableOscillators[3]
                    })
                ],
                // noise: noiseOptionsDefault.get(),
                noises: [
                    noiseOptionsDefault.get()
                ],
                components: [tremoloOptionsDefault.get(), eqOptionsDefault.get(), distortionOptionsDefault.get(), delayOptionsDefault.get()]
            };
        }

    }

})();