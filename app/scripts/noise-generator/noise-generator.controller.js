(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('NoiseGeneratorController', NoiseGeneratorController);

    function NoiseGeneratorController(SynthOptions) {
        var vm = this;

        var notifyComponentChangedThrottled = _.throttle(SynthOptions.notifyOscillatorChanged, 500);

        vm.toggleGainControl = toggleGainControl;
        vm.gainControllerInfoChanged = gainControllerInfoChanged;

        function toggleGainControl() {
            vm.noiseConfig.controls.gain.enabled = !vm.noiseConfig.controls.gain.enabled;
            gainControllerInfoChanged();
        }

        function gainControllerInfoChanged() {
            notifyComponentChangedThrottled(vm.noiseConfig);
        }
    }

})();