'use strict';

angular.module('chesireApp')

.controller('ResponseFunctionParamCtrl', function ($scope) {

    var init = function() {
        $scope.$watch('selectedValue', selectedValueChanged);
        $scope.selectedValue = $scope.paramParentObject[$scope.paramKey] || $scope.paramInfo.value;
        $scope.isBoolean = _.isBoolean($scope.paramInfo.value);
        $scope.isNumber = _.isNumber($scope.paramInfo.value);
    };

    var selectedValueChanged = function(newValue) {
        if($scope.paramParentObject[$scope.paramKey] !== newValue) {
            if($scope.isNumber) {
                newValue = parseFloat(newValue);
            }
            $scope.paramParentObject[$scope.paramKey] = newValue;
        }
    };

    init();

 });