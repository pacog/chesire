(function() {
    'use strict';
    angular.module('chesireApp')
        .controller('SynthListController', SynthListController);

    function SynthListController(SynthOptions) {
        var vm = this;

        vm.selectSynth = selectSynth;

        function selectSynth(synth) {
            SynthOptions.setSynthOptions(synth);
        }

    }

})();