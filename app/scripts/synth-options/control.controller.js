'use strict';

angular.module('chesireApp')

.controller('ControlCtrl', function ($scope, MidiControlMessages, SynthOptions) {

    var init = function() {
        $scope.controlListExpanded = false;
        $scope.midiControlMessages = MidiControlMessages;
        $scope.$watch('controlInfo.number', controlInfoNumberChanged);
        $scope.$watch('currentControlMessage.number', controlMessageChanged);
        $scope.$watch('controlInfo.param', controlInfoGestureChanged);
        $scope.$watch('controlInfo.responseFunction', _.throttle(controlInfoGestureChanged, 500), true);
    };

    var controlInfoNumberChanged = function(newNumber) {
        $scope.currentControlMessage = _.findWhere(MidiControlMessages, {number: newNumber});
    };

    var controlInfoGestureChanged = function(newControlInfo) {
        if(newControlInfo) {
            //TODO: this should be done some other way
            $scope.controlInfo.responseFunction.min = parseFloat($scope.controlInfo.responseFunction.min);
            $scope.controlInfo.responseFunction.max = parseFloat($scope.controlInfo.responseFunction.max);
            //TODO: first time every thing is set up we are probably calling this notify two times, not good
            SynthOptions.notifyControlChanged($scope.controlInfo);
        }
    };

    var controlMessageChanged = function(newValue, oldValue) {
        if(newValue !== oldValue) {
            $scope.controlInfo.number = newValue;
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

    $scope.removeControl = function() {
        SynthOptions.notifyControlRemoved($scope.controlInfo);
    };

    init();
 });