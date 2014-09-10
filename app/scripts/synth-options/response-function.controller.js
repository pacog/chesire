'use strict';

angular.module('chesireApp')

.controller('ResponseFunctionCtrl', function ($scope, ResponseFunctions) {

    var init = function() {
        $scope.availableResponseFunctions = ResponseFunctions;
    };

    $scope.toggleResponseFunctionList = function() {
        $scope.responseFunctionListExpanded = !$scope.responseFunctionListExpanded;
    };

    $scope.selectResponseFunction = function(newResponseFunction) {
        $scope.responseFunctionListExpanded = false;
        $scope.gestureObject.responseFunction.name = newResponseFunction.name;
    };

    init();
 });