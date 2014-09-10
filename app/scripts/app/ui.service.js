'use strict';

angular.module('chesireApp')
    .factory('UIService', function() {

        var menuOpenCallbacks = [];

        var notifyMenuOpen = function(menuName) {
            angular.forEach(menuOpenCallbacks, function(callback) {
                callback(menuName);
            });
        };

        var subscribeToMenuOpening = function(callback) {
            menuOpenCallbacks.push(callback);
        };

        var unsubscribeToMenuOpening = function(callback) {
            menuOpenCallbacks = _.without(menuOpenCallbacks, callback);
        };

        return {
            notifyMenuOpen: notifyMenuOpen,
            subscribeToMenuOpening: subscribeToMenuOpening,
            unsubscribeToMenuOpening: unsubscribeToMenuOpening
        };
    });