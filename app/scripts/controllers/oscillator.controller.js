'use strict';

angular.module('chesireApp')

.controller('OscillatorCtrl', function ($scope, CurrentSynth) {

    var currentSynth = null;

    var init = function() {
        currentSynth = CurrentSynth.getCurrentSynth();

        $scope.$watch(function() {
            return CurrentSynth.getCurrentSynth();
        }, synthChanged);

        $scope.$watchCollection(function() {
            return $scope.synthComponent.oscillatorCollection.getNodes();
        }, synthNodesChanged);
    };

    var synthChanged = function() {
        currentSynth = CurrentSynth.getCurrentSynth();
        $scope.synthComponent = currentSynth.getComponent($scope.componentInfo);
    };

    var synthNodesChanged = function() {
        $scope.oscillatorNodes = $scope.synthComponent.oscillatorCollection.getNodes();
    };

    $scope.getLeftPercentageFromNode = function(node) {
        return 100*Math.log2(node.oscillator.frequency.value/$scope.frequencySpectrumSize);
    };

    init();
});