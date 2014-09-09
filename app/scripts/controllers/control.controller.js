'use strict';

angular.module('chesireApp')

.controller('ControlCtrl', function ($scope, MidiControlMessages, SynthOptions) {

    var init = function() {
        $scope.controlListExpanded = false;
        $scope.midiControlMessages = MidiControlMessages;
        $scope.$watch('controlInfo.number', controlInfoNumberChanged);
        $scope.$watch('controlInfo.param', controlInfoGestureChanged);
    };

    var controlInfoNumberChanged = function(newNumber) {
        $scope.currentControlMessage = _.findWhere(MidiControlMessages, {number: newNumber});
    };

    var controlInfoGestureChanged = function(newControlInfo) {
        if(newControlInfo) {
            //TODO: first time every thing is set up we are probably calling this notify two times, not good
            SynthOptions.notifyControlChanged($scope.controlInfo);
        }
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