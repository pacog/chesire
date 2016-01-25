(function () {
    'use strict';

    angular.module('chesireApp')
        .filter('toMs', toMs)
        .filter('toBpm', toBpm);

    function toMs($filter) {
        return function(value) {
            return $filter('number')(1000/value, 3) + ' ms';
        };
    }

    function toBpm($filter) {
        return function(value) {
            return $filter('number')(value*60, 0) + ' bpm';
        };
    }

})();