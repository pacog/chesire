'use strict';

angular.module('chesireApp')

.controller('ControlCtrl', function ($scope, MidiControlMessages) {

    var init = function() {
        $scope.$watch('controlInfo.number', controlInfoNumberChanged);
    };

    var controlInfoNumberChanged = function(newNumber) {
        $scope.currentControlMessage = _.findWhere(MidiControlMessages, {number: newNumber});
    };

    init();
 });