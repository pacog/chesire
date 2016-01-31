(function () {
    'use strict';

    angular.module('chesireApp')
        .filter('toMs', toMs)
        .filter('toBpm', toBpm)
        .filter('sToBpm', sToBpm);

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

    function sToBpm($filter) {
        return function(value) {
            return $filter('number')(1/value*60, 0) + ' bpm';
        };
    }

})();