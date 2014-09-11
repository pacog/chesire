'use strict';

angular.module('chesireApp')

.controller('OscillatorCtrl', function ($scope, CurrentSynth, AvailableOscillators, SynthOptions, SynthOptionsHelper) {

    var currentSynth = null;

    var notifyComponentChangedThrottled = _.throttle(SynthOptions.notifyComponentChanged, 500);

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

        $scope.$watch('gainControllerInfo', gainControllerInfoChanged, true);

        $scope.$watch('componentInfo.transitionType', notifyOscillatorOptionsChanged);
        $scope.$watch('componentInfo.snapDistance', notifyOscillatorOptionsChanged);
        $scope.$watch('componentInfo.oscillatorType', notifyOscillatorOptionsChanged);
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
        if(newSynthOptions && newSynthOptions.controls) {
            var oscillatorInfo = SynthOptionsHelper.getOscillatorFromOptions(newSynthOptions);
            $scope.gainControllerInfo = oscillatorInfo.controls.gain;
        }
        $scope.synthOptions = newSynthOptions;
        if($scope.synthOptions.outputMode === 'midi') {
            $scope.componentInfo.transitionType = 'volume';
        }
    };

    var gainControllerInfoChanged = function(newOptions, oldOptions) {
        if(!_.isEqual(newOptions, oldOptions)) {
            notifyComponentChangedThrottled($scope.componentInfo);
        }
    };

    $scope.isMidiOutput = function() {
        if($scope.synthOptions) {
            return $scope.synthOptions.outputMode === 'midi';
        }
        return false;
    };

    $scope.getLeftPercentageFromNode = function(node) {
        return 100*Math.log2(node.oscillator.frequency.value/$scope.frequencySpectrumSize);
    };

    $scope.oscillatorTypeChanged = function() {
        SynthOptions.notifyComponentChanged($scope.componentInfo);
    };

    $scope.toggleListOfOscillatorType = function() {
        $scope.listOfOscillatorTypeExpanded = !$scope.listOfOscillatorTypeExpanded;
    };

    //TODO: when changing snap distance check if settings are correctly saved

    init();
});