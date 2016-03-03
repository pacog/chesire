(function() {
    'use strict';
    angular.module('chesireApp')
        .controller('SynthListController', SynthListController);

    function SynthListController(synthSelector) {
        var vm = this;

        vm.selectSynth = selectSynth;

        function selectSynth(synth) {
            synthSelector.notifySynthPresetSelected(angular.copy(synth));
        }

    }

})();