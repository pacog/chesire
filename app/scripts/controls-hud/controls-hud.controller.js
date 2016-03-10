(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ControlsHudController', ControlsHudController);

    function ControlsHudController($scope, SynthOptions, MidiControlMessages) {
        var vm = this;
        // var oldSynthOptions = null;

        vm.getMidiParamFromOptions = getMidiParamFromOptions;

        init();

        function init() {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            // if(newSynthOptions && !_.isEqual(newSynthOptions, oldSynthOptions)) {
                // oldSynthOptions = newSynthOptions;
                vm.controls = newSynthOptions.getActiveControls();
                vm.volumeControl = newSynthOptions.audio.controls.gain;
            // }
        }

        function getMidiParamFromOptions(options) {
            return _.findWhere(MidiControlMessages, {number: options.number});
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }

    }

})();
