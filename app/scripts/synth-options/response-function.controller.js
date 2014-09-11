'use strict';

angular.module('chesireApp')

.controller('ResponseFunctionCtrl', function ($scope, ResponseFunctions) {

    var init = function() {
        $scope.availableResponseFunctions = ResponseFunctions;
    };

    init();
 });