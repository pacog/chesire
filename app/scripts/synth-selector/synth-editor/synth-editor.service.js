(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('synthEditor', synthEditor);

    function synthEditor() {
        var synthChangedSubscribers = [];

        var factory = {
            notifySynthHasChanged: notifySynthHasChanged,
            subscribeToSynthChanged: subscribeToSynthChanged,
            unsubscribeToSynthChanged: unsubscribeToSynthChanged
        };

        return factory;

        function notifySynthHasChanged(isSynthModified) {
            angular.forEach(synthChangedSubscribers, function(callback) {
                callback(isSynthModified);
            });
        }

        function subscribeToSynthChanged(callback) {
            synthChangedSubscribers.push(callback);
        }

        function unsubscribeToSynthChanged(callback) {
            synthChangedSubscribers = _.without(synthChangedSubscribers, callback);
        }
    }
})();