(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('SoundSourceSelector', SoundSourceSelector);

    function SoundSourceSelector($scope, $timeout, componentsList, SynthOptions) {
        var vm = this;

        vm.componentsList = componentsList;
        vm.componentToggled = componentToggled;
        vm.componentDroppedOverSubComponent = componentDroppedOverSubComponent;
        vm.componentDroppedOverComponent = componentDroppedOverComponent;

        init();

        function init() {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            if(newSynthOptions) {
                vm.audioSynthOptions = newSynthOptions.audio;
            }
        }

        function componentToggled(component) {
            $timeout(function() { //TODO: ugly timeout, improve change-callbacks everywhere to not need it
                SynthOptions.notifyComponentChanged(component);
            });
        }

        function componentDroppedOverSubComponent(data, soundSource, subComponentDestination) {
            var origin = data['json/component'].componentInfo;
            vm.audioSynthOptions.moveComponentAfterSoundSourceComponent(origin, soundSource, subComponentDestination);
            SynthOptions.notifyOscillatorChanged();
            vm.componentsList.setActiveItem(origin);
        }

        function componentDroppedOverComponent(data, event, componentDestination) {
            var origin = data['json/component'].componentInfo;
            vm.audioSynthOptions.moveComponentAfterSoundSource(origin, componentDestination);
            SynthOptions.notifyOscillatorChanged();
            vm.componentsList.setActiveItem(origin);
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();