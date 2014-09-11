'use strict';

angular.module('chesireApp')

.controller('SelectBoxCtrl', function ($scope) {

    var init = function() {
        $scope.listExpanded = false;
    };

    $scope.toggleList = function() {
        $scope.listExpanded = !$scope.listExpanded;
    };

    $scope.selectValue = function(newValue) {
        $scope.value = newValue;
        $scope.listExpanded = false;
    };

    init();
});