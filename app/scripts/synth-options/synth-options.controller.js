'use strict';

angular.module('chesireApp')

.controller('SynthoptionsCtrl', function ($scope, SynthOptions, UIService, DefaultEmptyControl) {

    var init = function() {
        SynthOptions.getSynthOptions().then(function(synthOptions) {
            $scope.synthoptions = synthOptions;
        });
        UIService.subscribeToMenuOpening(checkIfShouldCloseMenu);
        //TODO: listen for changes in synth options
        //Also load the synths so we can track their values real time
        $scope.outputModes = [{
            name: 'Audio',
            value: 'audio'
        }, {
            name: 'MIDI',
            value: 'midi'
        }];
        $scope.$watch('synthoptions.outputMode', function(newOutputMode) {
            if(newOutputMode) {
                SynthOptions.setSynthOptions($scope.synthoptions);
            }
        });
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

    $scope.addControl = function() {
        $scope.synthoptions.getActiveControls().push(angular.copy(DefaultEmptyControl));
    };

    //TODO: on destroy: UIService.unsubscribeToMenuOpening(checkIfShouldCloseMenu);

    init();
});
