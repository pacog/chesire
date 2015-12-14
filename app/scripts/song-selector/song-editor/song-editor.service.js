(function() {
    'use strict';

    angular.module('chesireApp')
        .factory('songEditor', songEditor);

    function songEditor() {

        var songChangedSubscribers = [];

        var factory = {
            notifySongHasChanged: notifySongHasChanged,
            subscribeToSongChanged: subscribeToSongChanged,
            unsubscribeToSongChanged: unsubscribeToSongChanged
        };

        return factory;

        function notifySongHasChanged(isSongModified) {
            angular.forEach(songChangedSubscribers, function(callback) {
                callback(isSongModified);
            });
        }

        function subscribeToSongChanged(callback) {
            songChangedSubscribers.push(callback);
        }

        function unsubscribeToSongChanged(callback) {
            songChangedSubscribers = _.without(songChangedSubscribers, callback);
        }

    }

})();