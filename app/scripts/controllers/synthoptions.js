'use strict';

angular.module('chesireApp')

.controller('SynthoptionsCtrl', function ($scope, SynthOptions, UIService) {

    var init = function() {
        SynthOptions.getSynthOptions().then(function(synthOptions) {
            $scope.synthoptions = synthOptions;
        });
        UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);
        //TODO: listen for changes in synth options
        //Also load the synths so we can track their values real time

    };

    var checkIfShouldCloseMenu = function(newMenuOpened) {
        if(newMenuOpened !== 'synth-options') {
            $scope.expanded = false;
        }
    };

    $scope.toggle = function() {
        $scope.expanded = !$scope.expanded;
        $scope.listOfSynthsExpanded = false;
        if($scope.expanded) {
            UIService.notifyMenuOpen('synth-options');
        }
    };

    $scope.saveSong = function() {
        //TODO add then and loading flag
        // SongStore.saveSong($scope.currentScale);
    };

    $scope.deleteSong = function() {
        //TODO add then and loading flag
        // SongStore.deleteSong($scope.currentScale);
    };

    $scope.toggleListOfSynths = function() {
        $scope.listOfSynthsExpanded = !$scope.listOfSynthsExpanded;
    };

    $scope.selectSynth = function(synth) {
        $scope.listOfSynthsExpanded = false;
        $scope.synthoptions = synth;
    };

    //TODO: on destroy: UIService.unsubscribeToMenuOpening(checkIfShouldCloseMenu);

    init();
});
