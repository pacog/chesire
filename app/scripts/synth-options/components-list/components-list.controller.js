(function() {
    'use strict';

    angular.module('chesireApp')
        .controller('ComponentsListController', ComponentsListController);

    function ComponentsListController($scope, $timeout, SynthOptions, componentsList) {
        var vm = this;

        vm.componentsList = componentsList;
        vm.componentToggled = componentToggled;
        vm.componentDroppedOverComponent = componentDroppedOverComponent;
        vm.componentDroppedOverMerger = componentDroppedOverMerger;

        init();

        function init() {
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
            $scope.$on('$destroy', onDestroy);
        }

        function synthOptionsChanged(newSynthOptions) {
            if(newSynthOptions) {
                vm.components = newSynthOptions.getActiveComponents();
                vm.audioSynthOptions = newSynthOptions.audio;
            }
        }

        function componentToggled(component) {
            $timeout(function() { //TODO: ugly timeout, improve change-callbacks everywhere to not need it
                SynthOptions.notifyComponentChanged(component);
            });
        }

        function componentDroppedOverComponent(data, event, destinationComponent) {
            var origin = data['json/component'].componentInfo;
            vm.audioSynthOptions.moveComponentAfterComponent(origin, destinationComponent);
            SynthOptions.notifyOscillatorChanged();
            vm.componentsList.setActiveItem(origin);
        }

        function componentDroppedOverMerger(data) {
            var origin = data['json/component'].componentInfo;
            vm.audioSynthOptions.moveComponentToBeginning(origin);
            vm.componentsList.setActiveItem(origin);
        }

        function onDestroy() {
            SynthOptions.unsubscribeToChangesInSynthOptions(synthOptionsChanged);
        }
    }

})();