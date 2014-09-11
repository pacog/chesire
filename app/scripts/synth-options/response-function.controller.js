'use strict';

angular.module('chesireApp')

.controller('ResponseFunctionCtrl', function ($scope, ResponseFunctions) {

    var RESPONSE_VALUES_NUMBER = 20;

    var init = function() {
        $scope.availableResponseFunctions = ResponseFunctions;
        $scope.$watch('selectedResponseFunction', responseFunctionChanged);
        $scope.selectedResponseFunction = ResponseFunctions[$scope.responseFunctionInfo.name];
    };

    var responseFunctionChanged = function() {
        calculateResponseValues();
    };

    var calculateResponseValues = function() {
        $scope.responseFunctionValues = [];
        var newValue;
        var x;
        var increment = 1/RESPONSE_VALUES_NUMBER;
        $scope.responseFunctionIncrement = increment;
        for(var i=0; i<RESPONSE_VALUES_NUMBER; i++) {
            x = i*increment;
            newValue = $scope.selectedResponseFunction.getResponse(x, $scope.responseFunctionInfo);
            $scope.responseFunctionValues.push({
                x: x,
                y: newValue
            });
        }
    };

    init();
 });