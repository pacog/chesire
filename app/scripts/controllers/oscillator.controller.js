'use strict';

angular.module('chesireApp')

.controller('OscillatorCtrl', function ($scope, CurrentSynth, AvailableOscillators, SynthOptions) {

    var currentSynth = null;

    var init = function() {
        currentSynth = CurrentSynth.getCurrentSynth();

        $scope.transitionTypes = [{
            name: 'Glissando',
            value: 'glissando'
        }, {
            name: 'Volume',
            value: 'volume'
        }];
        $scope.AvailableOscillators = AvailableOscillators;
        $scope.$watch(function() {
            return CurrentSynth.getCurrentSynth();
        }, synthChanged);

        $scope.$watchCollection(function() {
            return $scope.synthComponent.oscillatorCollection.getNodes();
        }, synthNodesChanged);

        SynthOptions.getSynthOptions().then(function(newSynthOptions) {
            synthOptionsChanged(newSynthOptions);
            SynthOptions.subscribeToChangesInSynthOptions(synthOptionsChanged);
        });

        $scope.$watch('componentInfo.transitionType', notifyOscillatorOptionsChanged);
        $scope.$watch('componentInfo.snapDistance', notifyOscillatorOptionsChanged);
    };

    var synthChanged = function() {
        currentSynth = CurrentSynth.getCurrentSynth();
        $scope.synthComponent = currentSynth.getComponent($scope.componentInfo);
    };

    var synthNodesChanged = function() {
        $scope.oscillatorNodes = $scope.synthComponent.oscillatorCollection.getNodes();
    };

    var notifyOscillatorOptionsChanged = function() {
        SynthOptions.notifyComponentChanged($scope.componentInfo);
    };

    var synthOptionsChanged = function(newSynthOptions) {
        $scope.synthOptions = newSynthOptions;
        if($scope.synthOptions.outputMode === 'midi') {
            $scope.componentInfo.transitionType = 'volume';
        }
    };

    $scope.getLeftPercentageFromNode = function(node) {
        return 100*Math.log2(node.oscillator.frequency.value/$scope.frequencySpectrumSize);
    };

    $scope.changeOscillatorType = function(newOscillatorType) {
        $scope.componentInfo.oscillatorType = newOscillatorType;
        $scope.listOfOscillatorTypeExpanded = false;
        SynthOptions.notifyComponentChanged($scope.componentInfo);
    };

    $scope.toggleListOfOscillatorType = function() {
        $scope.listOfOscillatorTypeExpanded = !$scope.listOfOscillatorTypeExpanded;
    };

    //TODO: when changing snap distance check if settings are correctly saved

    init();
});