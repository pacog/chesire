'use strict';

angular.module('chesireApp')

.controller('ControlCtrl', function ($scope, MidiControlMessages, SynthOptions) {

    var init = function() {
        $scope.controlListExpanded = false;
        $scope.midiControlMessages = MidiControlMessages;
        $scope.$watch('controlInfo.number', controlInfoNumberChanged);
    };

    var controlInfoNumberChanged = function(newNumber) {
        $scope.currentControlMessage = _.findWhere(MidiControlMessages, {number: newNumber});
    };

    $scope.toggleControlList = function() {
        $scope.controlListExpanded = !$scope.controlListExpanded;
    };

    $scope.selectControl = function(newControl) {
        $scope.controlInfo.number = newControl.number;
        $scope.controlListExpanded = false;
        SynthOptions.notifyControlChanged($scope.controlInfo);
    };

    init();
 });