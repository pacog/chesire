'use strict';

angular.module('chesireApp')

.controller('StatsCtrl', function ($scope, $timeout, Leapmotion) {

    $scope.init = function() {

        //Timeout to make sure DOM is created for the directive
        $timeout(function() {

            $scope.stats = Leapmotion.getStats();
        });
    };
});
