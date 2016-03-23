(function() {
    'use strict';

    angular.module('chesireApp')
        .component('soundSourceSelector', {
            controller: 'SoundSourceSelector as vm',
            templateUrl: 'scripts/synth-options/sound-source-selector/sound-source-selector.tpl.html',
            bindings: {
                'component': '='
            }
        });
})();