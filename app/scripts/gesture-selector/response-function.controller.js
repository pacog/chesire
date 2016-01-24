'use strict';

angular.module('chesireApp')

.controller('ResponseFunctionCtrl', function ($scope, ResponseFunctions) {

    var RESPONSE_VALUES_NUMBER = 20;

    var init = function() {
        $scope.availableResponseFunctions = ResponseFunctions;
        $scope.$watch('selectedResponseFunction', responseFunctionChanged);
        $scope.selectedResponseFunction = ResponseFunctions[$scope.responseFunctionInfo.name];
        $scope.$watch('responseFunctionInfo', responseFunctionParamsChanged, true);
    };

    var responseFunctionChanged = function(newValue) {
        if($scope.responseFunctionInfo.name !== newValue.name) {
            $scope.responseFunctionInfo.name = newValue.name;
        }
    };

    var calculateResponseValues = function() {
        $scope.responseFunctionValues = [];
        var newValue;
        var x;
        var increment = 1/RESPONSE_VALUES_NUMBER;
        $scope.responseFunctionIncrement = increment;
        for(var i=0; i<RESPONSE_VALUES_NUMBER; i++) {
            x = i*increment;
            newValue = getYValue(x, $scope.responseFunctionInfo);
            $scope.responseFunctionValues.push({
                x: x,
                y: newValue
            });
        }
    };

    var getYValue = function(x, responseFunctionInfo) {
        var totalMin = 0;
        var totalMax = 1;
        if(!angular.isUndefined(responseFunctionInfo.TOTAL_MIN)) {
            totalMin = responseFunctionInfo.TOTAL_MIN;
        }
        if(!angular.isUndefined(responseFunctionInfo.TOTAL_MAX)) {
            totalMax = responseFunctionInfo.TOTAL_MAX;
        }
        var maxLength = totalMax - totalMin;
        return $scope.selectedResponseFunction.getResponse(x, $scope.responseFunctionInfo)/maxLength;
    };

    var responseFunctionParamsChanged = function() {
        calculateResponseValues();
    };

    init();
 });
