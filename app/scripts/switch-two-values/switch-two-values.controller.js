'use strict';

angular.module('chesireApp')

.controller('SwitchTwoValuesCtrl', function ($scope) {

    var init = function() {
        if(!$scope.bindModel) {
            $scope.bindModel = $scope.values[0].value;
        }
    };

    $scope.selectValue = function(newValue) {
        $scope.bindModel = newValue;
    };

    init();
});