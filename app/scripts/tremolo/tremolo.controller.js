(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('TremoloController', TremoloController);

    function TremoloController($scope, availableOscillators, SynthOptions) {
        var vm = this;

        vm.availableOscillators = availableOscillators;

        init();

        function init() {

            vm.componentInfo = $scope.componentInfo;
            delete $scope.componentInfo;

            SynthOptions.getSynthOptions().then(function() { //This get is just to wait for them to be ready
                SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
                // startWatchingForChanges();
            });
            $scope.$on('$destroy', onDestroy);
        }



        function synthOptionsChanged(newSynthOptions) {
            vm.synthOptions = newSynthOptions;

            // TODO: get controls
            // if(newSynthOptions && newSynthOptions.getActiveComponents()) {
            //     var oscillatorInfo = newSynthOptions.getOscillatorComponent();
            //     vm.gainControllerInfo = oscillatorInfo.controls.gain;
            // }

        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }

    }

})();