'use strict';

angular.module('chesireApp')

.controller('OscillatorCtrl', function ($scope, CurrentSynth, AvailableOscillators, SynthOptions) {

    var currentSynth = null;

    var notifyComponentChangedThrottled = _.throttle(SynthOptions.notifyComponentChanged, 500);

    var init = function() {
        currentSynth = CurrentSynth.getCurrentSynth();
        synthChanged(currentSynth);

        $scope.transitionTypes = [{
            name: 'Glissando',
            value: 'glissando'
        }, {
            name: 'Volume',
            value: 'volume'
        }];
        $scope.midiControlMode = [{
            name: 'Soft',
            value: 'soft'
        }, {
            name: 'Pulsate chord',
            value: 'pulsate_chord'
        }, {
            name: 'Pulsate notes',
            value: 'pulsate'
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
            startWatchingForChanges();
        });

        
    };

    var startWatchingForChanges = function() {
        $scope.$watch('gainControllerInfo', gainControllerInfoChanged, true);

        $scope.$watch('componentInfo.transitionType', notifyOscillatorOptionsChanged);
        $scope.$watch('componentInfo.midiControlMode', notifyOscillatorOptionsChanged);
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
        if(newSynthOptions && newSynthOptions.getActiveComponents()) {
            $scope.synthoptionsReady = true;
            var oscillatorInfo = newSynthOptions.getOscillatorComponent();
            $scope.gainControllerInfo = oscillatorInfo.controls.gain;
        }
        $scope.synthOptions = newSynthOptions;
        if($scope.synthOptions.isMidiOutput()) {
            $scope.componentInfo.transitionType = 'volume';
        }
    };

    var gainControllerInfoChanged = function(newOptions, oldOptions) {
        if(!_.isEqual(newOptions, oldOptions)) {
            notifyComponentChangedThrottled($scope.componentInfo);
        }
    };

    $scope.getLeftPercentageFromNode = function(node) {
        return 100*Math.log2(node.oscillator.frequency.value/$scope.frequencySpectrumSize);
    };

    $scope.toggleListOfOscillatorType = function() {
        $scope.listOfOscillatorTypeExpanded = !$scope.listOfOscillatorTypeExpanded;
    };

    //TODO: when changing snap distance check if settings are correctly saved

    init();
});