'use strict';

angular.module('chesireApp')

.directive('stats', function () {

    return {
        templateUrl: 'views/stats.html',
        restrict: 'E',
        scope: {
            'synthoptions': '=',
            'currentsound': '='
        },
        controller: 'StatsCtrl',
        link: function postLink(scope, element) {
    
            element.addClass('stats');
            scope.init(element);
        }
    };
});
