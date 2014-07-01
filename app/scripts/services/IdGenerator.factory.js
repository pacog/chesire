'use strict';

angular.module('chesireApp')
    .factory('IdGenerator', function() {

        var lastId = 42;

        var getUniqueId = function() {
            lastId = lastId + 1;
            return lastId;
        };

        return {
            getUniqueId: getUniqueId
        };
    });