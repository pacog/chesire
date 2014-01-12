'use strict';

angular.module('chesireApp')

.controller('ChesirecanvasCtrl', function ($scope) {

    $scope.init = function(element) {

        element.append('test');
    };
});
