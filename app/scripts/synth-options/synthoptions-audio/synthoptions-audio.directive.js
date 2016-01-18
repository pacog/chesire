(function() {
    'use strict';

    angular.module('chesireApp')
        .directive('synthoptionsAudio', synthoptionsAudio);

    function synthoptionsAudio() {
        return {
            restrict: 'E',
            controller: 'SynthoptionsAudioController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'scripts/synth-options/synthoptions-audio/synthoptions-audio.tpl.html'
        };
    }
})();